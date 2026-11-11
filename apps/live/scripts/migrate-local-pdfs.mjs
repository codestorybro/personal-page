// One-time, local-only migration of pre-KV development PDFs. No remote APIs,
// no source deletion and no changes to the existing Durable Object databases.
import { getPlatformProxy } from "wrangler";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve, join } from "node:path";

const temporary = await mkdtemp(join(tmpdir(), "codestorybro-kv-migration-"));
let platform;
try {
  const configPath = join(temporary, "wrangler.json");
  await writeFile(
    configPath,
    JSON.stringify({
      name: "codestorybro-local-migration",
      compatibility_date: "2026-11-09",
      kv_namespaces: [{ binding: "PDFS", id: "codestorybro-live-pdfs-local" }],
      r2_buckets: [
        {
          binding: "LEGACY",
          bucket_name: "codestorybro-live-private-pdfs-local",
        },
      ],
    }),
  );
  platform = await getPlatformProxy({
    configPath,
    persist: { path: resolve(".wrangler/state/v3") },
    remoteBindings: false,
    envFiles: [],
  });
  let cursor;
  let copied = 0;
  do {
    const page = await platform.env.LEGACY.list({ cursor });
    for (const item of page.objects) {
      if (item.size > 20_000_000)
        throw new Error(`PDF exceeds 20 MB: ${item.key}. Original preserved.`);
      const existing = await platform.env.PDFS.getWithMetadata(
        item.key,
        "stream",
      );
      if (existing.value) {
        await existing.value.cancel();
        if (existing.metadata?.size !== item.size)
          throw new Error(`Size mismatch: ${item.key}`);
        continue;
      }
      const object = await platform.env.LEGACY.get(item.key);
      await platform.env.PDFS.put(item.key, object.body, {
        metadata: { size: object.size },
      });
      copied++;
    }
    cursor = page.truncated ? page.cursor : undefined;
  } while (cursor);
  console.log(
    `Copied ${copied} local PDFs to KV. Original R2 files and session data preserved.`,
  );
} finally {
  await platform?.dispose();
  await rm(temporary, { recursive: true, force: true });
}
