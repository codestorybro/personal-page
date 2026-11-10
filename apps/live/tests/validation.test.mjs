import { test } from "node:test";
import assert from "node:assert/strict";
import { transformWithEsbuild } from "vite";
import { readFile, writeFile, unlink } from "node:fs/promises";
// Compile the small shared validator using the same TS transform as the app.
const out = new URL("../shared/.protocol-test.mjs", import.meta.url);
const source = await readFile(
  new URL("../shared/protocol.ts", import.meta.url),
  "utf8",
);
await writeFile(
  out,
  (await transformWithEsbuild(source, "protocol.ts", { loader: "ts" })).code,
);
const { parseQuestions } = await import(out.href);
await unlink(out);
test("rejects malformed questions, duplicate IDs and out-of-range slides", () => {
  assert.throws(() =>
    parseQuestions([{ id: "q", slide: 0, text: "?", a: "A", b: "B" }]),
  );
  assert.throws(() =>
    parseQuestions([{ id: "q", slide: 1, text: "?", a: "", b: "B" }]),
  );
  const q = { id: "q", slide: 1, text: "?", a: "A", b: "B" };
  assert.throws(() => parseQuestions([q, q]));
  assert.throws(() => parseQuestions(Array(101).fill(q)));
  assert.deepEqual(parseQuestions([q]), [q]);
});
