import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import WebSocket from "ws";
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export async function startServer(port = 8791, environment = "local") {
  const directory = await mkdtemp(join(tmpdir(), "codestorybro-live-test-"));
  const origin = `http://127.0.0.1:${port}`;
  const server = spawn(
    process.execPath,
    [
      "node_modules/wrangler/bin/wrangler.js",
      "dev",
      ...(environment ? ["--env", environment] : []),
      "--inspector-port",
      String(port + 100),
      "--port",
      String(port),
      "--ip",
      "127.0.0.1",
      "--persist-to",
      directory,
    ],
    {
      cwd: new URL("..", import.meta.url),
      env: {
        ...process.env,
        WRANGLER_SEND_METRICS: "false",
        WRANGLER_LOG_PATH: join(directory, "wrangler.log"),
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  let output = "";
  server.stdout.on("data", (data) => {
    output += data;
  });
  server.stderr.on("data", (data) => {
    output += data;
  });
  const stop = async () => {
    server.kill("SIGTERM");
    await Promise.race([
      new Promise((resolve) => server.once("exit", resolve)),
      delay(3000),
    ]);
    if (server.exitCode === null) server.kill("SIGKILL");
    await rm(directory, { recursive: true, force: true });
  };
  try {
    for (let i = 0; i < 100; i++) {
      if (server.exitCode !== null) throw new Error(output);
      try {
        if ((await fetch(`${origin}/api/health`)).ok) return { origin, stop };
      } catch {
        /* wait for workerd */
      }
      await delay(200);
    }
    throw new Error(`Server did not start: ${output}`);
  } catch (e) {
    await stop();
    throw e;
  }
}
export async function request(origin, path, method = "GET", body, cookie) {
  const response = await fetch(`${origin}${path}`, {
    method,
    headers: {
      Origin: origin,
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json();
  return {
    response,
    data,
    cookie: response.headers.get("set-cookie")?.split(";")[0],
  };
}
export function connect(origin, id, cookie, presenter = false) {
  return new Promise((resolve, reject) => {
    const messages = [];
    const waiters = [];
    const ws = new WebSocket(
      `${origin.replace("http:", "ws:")}/api/${presenter ? "presenter/sessions" : "sessions"}/${id}/socket`,
      { headers: { Origin: origin, ...(cookie ? { Cookie: cookie } : {}) } },
    );
    const timeout = setTimeout(() => {
      ws.terminate();
      reject(new Error("Socket timeout"));
    }, 30000);
    const client = {
      ws,
      messages,
      next(predicate, timeoutMs = 30000) {
        const existing = messages.findIndex(predicate);
        if (existing >= 0)
          return Promise.resolve(messages.splice(existing, 1)[0]);
        return new Promise((res, rej) => {
          const waiter = {
            predicate,
            res,
            timer: setTimeout(() => {
              waiters.splice(waiters.indexOf(waiter), 1);
              rej(new Error("Message timeout"));
            }, timeoutMs),
          };
          waiters.push(waiter);
        });
      },
      send(data) {
        ws.send(JSON.stringify(data));
      },
      close() {
        ws.terminate();
      },
    };
    ws.on("message", (raw) => {
      if (String(raw) === "pong") return;
      const data = JSON.parse(String(raw));
      const index = waiters.findIndex((w) => w.predicate(data));
      if (index >= 0) {
        const [waiter] = waiters.splice(index, 1);
        clearTimeout(waiter.timer);
        waiter.res(data);
      } else {
        messages.push(data);
        if (messages.length > 500) messages.shift();
      }
    });
    ws.once("open", () => {
      clearTimeout(timeout);
      resolve(client);
    });
    ws.once("error", (error) => {
      clearTimeout(timeout);
      reject(error);
    });
  });
}
export function samplePdf(pages = 1) {
  // Small valid PDF with numbered pages, also useful for browser QA.
  const objects = [
    `<< /Type /Catalog /Pages 2 0 R >>`,
    `<< /Type /Pages /Kids [${Array.from({ length: pages }, (_, i) => `${3 + i * 2} 0 R`).join(" ")}] /Count ${pages} >>`,
  ];
  for (let i = 0; i < pages; i++) {
    const stream = `BT /F1 32 Tf 60 240 Td (CodeStoryBro Live - slide ${i + 1}) Tj ET`;
    objects.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 640 360] /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> /Contents ${4 + i * 2} 0 R >>`,
      `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
    );
  }
  let text = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, i) => {
    offsets.push(Buffer.byteLength(text));
    text += `${i + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xref = Buffer.byteLength(text);
  text += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets
    .slice(1)
    .map((n) => `${String(n).padStart(10, "0")} 00000 n \n`)
    .join(
      "",
    )}trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(text);
}
export async function uploadPdf(origin, id, pages = 2) {
  const response = await fetch(`${origin}/api/presenter/sessions/${id}/pdf`, {
    method: "POST",
    headers: {
      Origin: origin,
      "Content-Type": "application/pdf",
      "X-Pdf-Name": "test.pdf",
      "X-Pdf-Pages": String(pages),
    },
    body: samplePdf(pages),
  });
  if (!response.ok) throw new Error(await response.text());
}
