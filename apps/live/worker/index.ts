import {
  HttpError,
  boundedText,
  parseQuestions,
  type Command,
} from "../shared/protocol";
import { localRequest, participantCookie, presenter, sameOrigin } from "./auth";
import { errorResponse } from "./objects";
import type { Env } from "./env";
export { LiveSession, Catalog } from "./objects";
const MAX_PDF = 50_000_000;
async function json(request: Request): Promise<Record<string, unknown>> {
  const text = await request.text();
  if (text.length > 100_000) throw new HttpError(413, "Żądanie jest za duże.");
  try {
    const body = JSON.parse(text);
    if (body && typeof body === "object" && !Array.isArray(body)) return body;
  } catch {
    /* invalid JSON */
  }
  throw new HttpError(400, "Niepoprawny JSON.");
}
const csvCell = (v: string | number) =>
  `"${String(v)
    .replace(/^[=+@\-\t\r]/, "'$&")
    .replaceAll('"', '""')}"`;
async function route(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;
  if (!path.startsWith("/api/")) return env.ASSETS.fetch(request);
  if ((method !== "GET" && method !== "HEAD") || request.headers.get("Upgrade"))
    sameOrigin(request, env);
  if (path === "/api/health" && method === "GET")
    return Response.json({ ok: true });
  const admin = path.startsWith("/api/presenter/");
  const expires = admin ? await presenter(request, env) : 0;
  const catalog = env.CATALOG.get(env.CATALOG.idFromName("presenter"));
  if (path === "/api/presentations" && method === "GET")
    return Response.json(await catalog.published());
  const publicDownload = path.match(
    /^\/api\/presentations\/([a-f0-9-]{36})\/pdf$/,
  );
  if (publicDownload && method === "GET") {
    const id = publicDownload[1];
    const info = await env.SESSIONS.get(
      env.SESSIONS.idFromName(id),
    ).publicationInfo();
    const object = await env.PDFS.get(info.key);
    if (!object) throw new HttpError(404, "Ta prezentacja nie jest dostępna.");
    return new Response(object.body, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": String(object.size),
        "Content-Disposition": `attachment; filename="codestorybro-${id}.pdf"`,
      },
    });
  }
  if (path === "/api/presenter/me" && method === "GET")
    return Response.json({
      local: localRequest(request, env),
      email: localRequest(request, env) ? "Tryb lokalny" : env.PRESENTER_EMAIL,
    });
  if (path === "/api/presenter/sessions") {
    if (method === "GET") {
      const ids = await catalog.list();
      const summaries = await Promise.all(
        ids.map(
          async (id) =>
            (await env.SESSIONS.get(env.SESSIONS.idFromName(id)).summary()) ?? {
              id,
              title: "Sesja w trakcie usuwania",
              status: "ended",
              createdAt: "",
              participants: 0,
              totalParticipants: 0,
              questions: 0,
              deleting: true,
            },
        ),
      );
      return Response.json(summaries);
    }
    if (method === "POST") {
      const body = await json(request);
      const title = boundedText(body.title, 160, "Tytuł");
      const questions = parseQuestions(body.questions ?? []);
      const id = crypto.randomUUID();
      const session = env.SESSIONS.get(env.SESSIONS.idFromName(id));
      await catalog.add(id);
      try {
        return Response.json(await session.initialize(id, title, questions), {
          status: 201,
        });
      } catch (e) {
        await catalog.remove(id);
        throw e;
      }
    }
  }
  const match = path.match(
    /^\/api\/(presenter\/sessions|sessions)\/([a-f0-9-]{36})(?:\/(join|socket|commands|pdf|export|publication))?$/,
  );
  if (!match) throw new HttpError(404, "Nie ma takiego adresu.");
  const [, , id, action] = match;
  const session = env.SESSIONS.get(env.SESSIONS.idFromName(id));
  const participantId = participantCookie(request, id);
  if (!admin) {
    if (action === "join" && method === "POST") {
      const joined = await session.join(participantId);
      const secure = url.protocol === "https:" ? "; Secure" : "";
      return Response.json(joined.state, {
        headers: {
          "Set-Cookie": `live_${id}=${joined.participantId}; Path=/api/sessions/${id}; HttpOnly; SameSite=Strict; Max-Age=604800${secure}`,
        },
      });
    }
    if (action !== "socket" || method !== "GET" || !participantId)
      throw new HttpError(401, "Dołącz do sesji przez kod QR.");
  }
  if (action === "socket" && method === "GET") {
    const headers = new Headers({
      Upgrade: "websocket",
      "x-live-role": admin ? "presenter" : "participant",
      "x-live-expires": String(
        admin ? expires : Math.floor(Date.now() / 1000) + 86400,
      ),
    });
    if (participantId && !admin)
      headers.set("x-live-participant", participantId);
    return session.fetch(
      new Request("https://session.internal/socket", { headers }),
    );
  }
  if (!admin) throw new HttpError(403, "Brak dostępu.");
  if (!action && method === "DELETE") {
    await session.destroy(id);
    return Response.json({ ok: true });
  }
  if (!action && method === "GET")
    return Response.json(await session.snapshot("presenter"));
  if (!action && method === "PUT") {
    const body = await json(request);
    return Response.json(await session.edit(body.title, body.questions));
  }
  if (action === "commands" && method === "POST")
    return Response.json(
      await session.command((await json(request)) as Command),
    );
  if (action === "publication") {
    if (method === "DELETE") return Response.json(await session.unpublish());
    if (method === "POST") {
      const info = await session.pdfInfo();
      if (info.status !== "ended" || !info.key)
        throw new HttpError(
          409,
          "Najpierw zakończ sesję. W archiwum musi być PDF.",
        );
      const length = Number(request.headers.get("Content-Length"));
      if (!Number.isSafeInteger(length) || length < 5 || length > 75_000_000)
        throw new HttpError(
          413,
          "Udostępniony PDF może mieć maksymalnie 75 MB.",
        );
      if (
        request.headers.get("Content-Type") !== "application/pdf" ||
        !request.body
      )
        throw new HttpError(400, "Wybierz plik PDF.");
      const key = `${id}/publication-${crypto.randomUUID()}.pdf`;
      await catalog.reserve(key, length);
      try {
        let prefix = "";
        const validate = new TransformStream<Uint8Array, Uint8Array>({
          transform(chunk, controller) {
            if (prefix.length < 5) {
              prefix += new TextDecoder().decode(
                chunk.slice(0, 5 - prefix.length),
              );
              if (prefix.length === 5 && prefix !== "%PDF-")
                throw new HttpError(400, "Niepoprawny PDF.");
            }
            controller.enqueue(chunk);
          },
        });
        const fixed = new FixedLengthStream(length);
        await Promise.all([
          request.body.pipeThrough(validate).pipeTo(fixed.writable),
          env.PDFS.put(key, fixed.readable, {
            httpMetadata: { contentType: "application/pdf" },
          }),
        ]);
        return Response.json(await session.publish(key, info.key));
      } catch (e) {
        await env.PDFS.delete(key);
        await catalog.release(key);
        throw e;
      }
    }
    throw new HttpError(405, "Niedozwolona operacja.");
  }
  if (action === "export" && method === "GET") {
    const state = await session.snapshot("presenter");
    const rows: (string | number)[][] = [
      [
        "Sesja",
        "Slajd",
        "Pytanie",
        "A",
        "B",
        "Głosy A",
        "Głosy B",
        "Łącznie",
        "Status",
        "Runda",
      ],
    ];
    for (const q of state.questions ?? []) {
      const r = state.results![q.id];
      rows.push([
        state.title,
        q.slide,
        q.text,
        q.a,
        q.b,
        r.A,
        r.B,
        r.total,
        state.closedIds?.includes(q.id)
          ? "zamknięte"
          : state.active?.id === q.id
            ? "otwarte"
            : "nieuruchomione",
        (state.history?.[q.id]?.length ?? 0) + 1,
      ]);
      for (const previous of state.history?.[q.id] ?? []) {
        rows.push([
          state.title,
          q.slide,
          q.text,
          q.a,
          q.b,
          previous.result.A,
          previous.result.B,
          previous.result.total,
          "zamknięte",
          previous.round,
        ]);
      }
    }
    return new Response(
      "\uFEFF" + rows.map((r) => r.map(csvCell).join(",")).join("\r\n"),
      {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="codestorybro-${id}.csv"`,
        },
      },
    );
  }
  if (action === "pdf") {
    const info = await session.pdfInfo();
    if (method === "POST") {
      if (info.key || info.status !== "draft")
        throw new HttpError(
          409,
          "Usuń poprzedni PDF przed dodaniem nowego. Sesja musi być szkicem.",
        );
      const length = Number(request.headers.get("Content-Length"));
      if (!length || length > MAX_PDF)
        throw new HttpError(413, "PDF może mieć maksymalnie 50 MB.");
      const pageCount = Number(request.headers.get("X-Pdf-Pages"));
      if (!Number.isInteger(pageCount) || pageCount < 1 || pageCount > 2000)
        throw new HttpError(400, "Niepoprawna liczba slajdów.");
      const name = boundedText(
        decodeURIComponent(
          request.headers.get("X-Pdf-Name") ?? "Prezentacja.pdf",
        ),
        200,
        "Nazwa PDF",
      );
      if (request.headers.get("Content-Type") !== "application/pdf")
        throw new HttpError(400, "Wybierz plik PDF.");
      if (!request.body || length < 5)
        throw new HttpError(400, "Plik nie jest poprawnym PDF-em.");
      const key = `${id}/${crypto.randomUUID()}.pdf`;
      await catalog.reserve(key, length);
      try {
        // Stream instead of buffering a 50 MB PDF in the 128 MB Worker isolate.
        let prefix = "";
        let received = 0;
        const validate = new TransformStream<Uint8Array, Uint8Array>({
          transform(chunk, controller) {
            received += chunk.byteLength;
            if (received > length)
              throw new HttpError(413, "PDF jest za duży.");
            if (prefix.length < 5) {
              prefix += new TextDecoder().decode(
                chunk.slice(0, 5 - prefix.length),
              );
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
          request.body.pipeThrough(validate).pipeTo(fixed.writable),
          env.PDFS.put(key, fixed.readable, {
            httpMetadata: { contentType: "application/pdf" },
          }),
        ]);
        await session.attachPdf(key, name, pageCount);
      } catch (e) {
        await env.PDFS.delete(key);
        await catalog.release(key);
        throw e;
      }
      return Response.json({ ok: true });
    }
    if (method === "GET") {
      if (!info.key) throw new HttpError(404, "Nie dodano PDF.");
      const object = await env.PDFS.get(info.key, { range: request.headers });
      if (!object) throw new HttpError(404, "Plik PDF jest niedostępny.");
      const headers = new Headers({
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="presentation.pdf"',
        "Accept-Ranges": "bytes",
        ETag: object.httpEtag,
      });
      let status = 200;
      if (
        object.range &&
        "offset" in object.range &&
        object.range.offset !== undefined &&
        object.range.length !== undefined
      ) {
        status = 206;
        headers.set(
          "Content-Range",
          `bytes ${object.range.offset}-${object.range.offset + object.range.length - 1}/${object.size}`,
        );
        headers.set("Content-Length", String(object.range.length));
      } else headers.set("Content-Length", String(object.size));
      return new Response(object.body, { status, headers });
    }
    if (method === "DELETE") {
      if (info.status === "live")
        throw new HttpError(409, "Zakończ sesję przed usunięciem PDF.");
      if (info.key) {
        // Detach atomically before deletion so a concurrent start cannot use a deleted PDF.
        await session.removePdf(info.key);
        await env.PDFS.delete(info.key);
        await catalog.release(info.key);
      }
      return Response.json({ ok: true });
    }
  }
  throw new HttpError(405, "Niedozwolona operacja.");
}
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    let response: Response;
    try {
      response = await route(request, env);
    } catch (e) {
      response = errorResponse(e);
    }
    if (response.status === 101) return response;
    const result = new Response(response.body, response);
    result.headers.set("X-Content-Type-Options", "nosniff");
    result.headers.set("Referrer-Policy", "no-referrer");
    result.headers.set("X-Frame-Options", "DENY");
    if (new URL(request.url).pathname.startsWith("/api/"))
      result.headers.set("Cache-Control", "no-store");
    else
      result.headers.set(
        "Content-Security-Policy",
        "default-src 'self'; script-src 'self'; worker-src 'self' blob:; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self' wss: ws://127.0.0.1:* ws://localhost:*; font-src 'self' blob:; object-src 'none'; base-uri 'none'; frame-ancestors 'none'",
      );
    return result;
  },
} satisfies ExportedHandler<Env>;
