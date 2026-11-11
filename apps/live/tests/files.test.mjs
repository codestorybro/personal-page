import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { transformWithEsbuild } from "vite";

const compile = async (path) =>
  (
    await transformWithEsbuild(
      await readFile(new URL(path, import.meta.url), "utf8"),
      path,
      { loader: "ts" },
    )
  ).code;
const source =
  (await compile("../shared/protocol.ts")) +
  (await compile("../worker/files.ts")).replace(
    /import \{ HttpError, LIMITS \} from "\.\.\/shared\/protocol";/,
    "",
  );
const { storePdf, pdfResponse, LIMITS } = await import(
  `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`
);
// Worker-specific stream constructor; application validation is exercised here.
globalThis.FixedLengthStream = class extends TransformStream {
  constructor() {
    super();
  }
};
const bytes = new TextEncoder().encode("%PDF-123456789");
function memoryKV() {
  const files = new Map();
  return {
    PDFS: {
      async put(key, stream, { metadata }) {
        const body = await new Response(stream).arrayBuffer();
        files.set(key, { body, metadata });
      },
      async getWithMetadata(key) {
        const file = files.get(key);
        return file
          ? { value: new Response(file.body).body, metadata: file.metadata }
          : { value: null, metadata: null };
      },
    },
  };
}
test("KV rejects over-limit, malformed and interrupted PDFs before publishing", async () => {
  const env = memoryKV();
  const stream = (body) => new Response(body).body;
  await assert.rejects(
    storePdf(env, "large", stream(bytes), LIMITS.pdfBytes + 1),
    /20 MB/,
  );
  await assert.rejects(storePdf(env, "invalid", stream("bad PDF"), 7));
  await assert.rejects(storePdf(env, "short", stream(bytes), bytes.length + 1));
  await assert.rejects(storePdf(env, "long", stream(bytes), bytes.length - 1));
  assert.equal((await env.PDFS.getWithMetadata("invalid")).value, null);
});
test("KV serves complete PDFs, byte ranges, suffixes and rejects unsatisfiable ranges", async () => {
  const env = memoryKV();
  await storePdf(env, "session/pdf", new Response(bytes).body, bytes.length);
  for (const [range, status, text] of [
    [null, 200, "%PDF-123456789"],
    ["bytes=0-4", 206, "%PDF-"],
    ["bytes=5-", 206, "123456789"],
    ["bytes=-3", 206, "789"],
    ["bytes=999-", 416, ""],
    ["bytes=4-1", 416, ""],
    ["bytes=0-1,4-5", 416, ""],
  ]) {
    const request = new Request("https://stage.example/pdf", {
      headers: range ? { Range: range } : {},
    });
    const response = await pdfResponse(request, env, "session/pdf", "inline");
    assert.equal(response.status, status, range);
    assert.equal(await response.text(), text, range);
  }
});
test("KV propagation delay is retryable rather than a permanent missing file", async () => {
  const response = await pdfResponse(
    new Request("https://stage.example/pdf"),
    memoryKV(),
    "new",
    "inline",
  );
  assert.equal(response.status, 503);
  assert.equal(response.headers.get("Retry-After"), "5");
});
