import { HttpError, LIMITS } from "../shared/protocol";
import type { Env } from "./env";

type PdfMetadata = { size: number };

export async function storePdf(
  env: Env,
  key: string,
  body: ReadableStream<Uint8Array>,
  length: number,
) {
  if (!Number.isSafeInteger(length) || length < 5 || length > LIMITS.pdfBytes)
    throw new HttpError(413, "PDF może mieć maksymalnie 20 MB.");
  let prefix = "";
  let received = 0;
  const validate = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      received += chunk.byteLength;
      if (received > length) throw new HttpError(413, "PDF jest za duży.");
      if (prefix.length < 5) {
        prefix += new TextDecoder().decode(chunk.slice(0, 5 - prefix.length));
        if (prefix.length === 5 && prefix !== "%PDF-")
          throw new HttpError(400, "Plik nie jest poprawnym PDF-em.");
      }
      controller.enqueue(chunk);
    },
    flush() {
      if (received !== length || prefix !== "%PDF-")
        throw new HttpError(400, "Przesyłanie PDF zostało przerwane.");
    },
  });
  const fixed = new FixedLengthStream(length);
  await Promise.all([
    body.pipeThrough(validate).pipeTo(fixed.writable),
    env.PDFS.put(key, fixed.readable, { metadata: { size: length } }),
  ]);
}

// KV has no native Range API. Slice the stream, keeping memory bounded even
// when PDF.js requests a range near the end of a 20 MB document.
function sliceStream(
  body: ReadableStream<Uint8Array>,
  start: number,
  end: number,
) {
  const reader = body.getReader();
  let offset = 0;
  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            controller.close();
            return;
          }
          const from = Math.max(0, start - offset);
          const to = Math.min(value.byteLength, end + 1 - offset);
          offset += value.byteLength;
          if (to > from) controller.enqueue(value.subarray(from, to));
          if (offset > end) {
            controller.close();
            await reader.cancel();
            return;
          }
          if (to > from) return;
        }
      } catch (error) {
        controller.error(error);
      }
    },
    cancel(reason) {
      return reader.cancel(reason);
    },
  });
}

export async function pdfResponse(
  request: Request,
  env: Env,
  key: string,
  disposition: string,
): Promise<Response> {
  const { value, metadata } = await env.PDFS.getWithMetadata<PdfMetadata>(
    key,
    "stream",
  );
  if (!value || !metadata) {
    // A new immutable key may take up to 60 seconds to reach another location.
    return Response.json(
      { error: "PDF nie jest jeszcze dostępny. Spróbuj ponownie za chwilę." },
      { status: 503, headers: { "Retry-After": "5" } },
    );
  }
  const etag = `"${key.split("/").at(-1)}"`;
  const headers = new Headers({
    "Content-Type": "application/pdf",
    "Content-Disposition": disposition,
    "Accept-Ranges": "bytes",
    "Content-Length": String(metadata.size),
    ETag: etag,
  });
  const range = request.headers.get("Range");
  const ifRange = request.headers.get("If-Range");
  if (!range || (ifRange && ifRange !== etag))
    return new Response(value, { headers });
  const match = /^bytes=(\d*)-(\d*)$/.exec(range);
  let start = 0;
  let end = metadata.size - 1;
  if (match && (match[1] || match[2])) {
    if (!match[1]) start = Math.max(0, metadata.size - Number(match[2]));
    else {
      start = Number(match[1]);
      if (match[2]) end = Math.min(end, Number(match[2]));
    }
  }
  if (
    !match ||
    (!match[1] && !match[2]) ||
    start > end ||
    start >= metadata.size
  ) {
    await value.cancel();
    return new Response(null, {
      status: 416,
      headers: { "Content-Range": `bytes */${metadata.size}` },
    });
  }
  headers.set("Content-Range", `bytes ${start}-${end}/${metadata.size}`);
  headers.set("Content-Length", String(end - start + 1));
  return new Response(sliceStream(value, start, end), { status: 206, headers });
}
