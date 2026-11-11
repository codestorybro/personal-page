import { createRemoteJWKSet, jwtVerify } from "jose";
import { HttpError } from "../shared/protocol";
import type { Env } from "./env";
const keys = new Map<string, ReturnType<typeof createRemoteJWKSet>>();
export function localRequest(request: Request, env: Env) {
  return (
    env.DEV_AUTH === "local-only" &&
    ["localhost", "127.0.0.1", "[::1]"].includes(new URL(request.url).hostname)
  );
}
export async function presenter(request: Request, env: Env): Promise<number> {
  if (localRequest(request, env)) return Math.floor(Date.now() / 1000) + 3600;
  if (!env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD || !env.PRESENTER_EMAIL)
    throw new HttpError(
      503,
      "Logowanie prezentera nie jest jeszcze skonfigurowane.",
    );
  if (!/^[a-z0-9-]+\.cloudflareaccess\.com$/.test(env.ACCESS_TEAM_DOMAIN))
    throw new HttpError(503, "Niepoprawna konfiguracja Access.");
  const token = request.headers.get("Cf-Access-Jwt-Assertion");
  if (!token) throw new HttpError(401, "Zaloguj się przez Cloudflare Access.");
  const issuer = `https://${env.ACCESS_TEAM_DOMAIN}`;
  let jwks = keys.get(issuer);
  if (!jwks) {
    jwks = createRemoteJWKSet(new URL(`${issuer}/cdn-cgi/access/certs`));
    keys.set(issuer, jwks);
  }
  try {
    const { payload } = await jwtVerify(token, jwks, {
      issuer,
      audience: env.ACCESS_AUD,
      algorithms: ["RS256"],
    });
    if (
      typeof payload.email !== "string" ||
      payload.email.toLowerCase() !== env.PRESENTER_EMAIL.toLowerCase() ||
      !payload.exp
    )
      throw new Error("Forbidden");
    return payload.exp;
  } catch {
    throw new HttpError(
      401,
      "Sesja logowania wygasła lub konto nie ma dostępu.",
    );
  }
}
export function sameOrigin(request: Request, env: Env) {
  const origin = request.headers.get("Origin");
  const expected = localRequest(request, env)
    ? new URL(request.url).origin
    : env.APP_ORIGIN;
  // Vite is only an optional loopback development frontend.
  if (
    localRequest(request, env) &&
    ["http://127.0.0.1:5173", "http://localhost:5173"].includes(origin ?? "")
  )
    return;
  if (!expected || origin !== expected)
    throw new HttpError(403, "Żądanie pochodzi z niedozwolonej strony.");
}
export function participantCookie(request: Request, id: string): string | null {
  const value = request.headers
    .get("Cookie")
    ?.split(";")
    .map((s) => s.trim())
    .find((s) => s.startsWith(`live_${id}=`))
    ?.split("=")[1];
  return value && /^[a-f0-9-]{36}$/.test(value) ? value : null;
}
