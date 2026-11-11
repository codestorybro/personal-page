import { test, after } from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { writeFile, unlink } from "node:fs/promises";
import { exportJWK, generateKeyPair, SignJWT } from "jose";
const out = new URL("../worker/.auth-test.mjs", import.meta.url);
const built = await build({
  entryPoints: [new URL("../worker/auth.ts", import.meta.url).pathname],
  bundle: true,
  platform: "browser",
  format: "esm",
  packages: "external",
  write: false,
});
await writeFile(out, built.outputFiles[0].text);
const { presenter, localRequest, sameOrigin } = await import(out.href);
await unlink(out);
const env = {
  ACCESS_TEAM_DOMAIN: "test-team.cloudflareaccess.com",
  ACCESS_AUD: "live-audience",
  PRESENTER_EMAIL: "presenter@example.com",
  APP_ORIGIN: "https://live.example.com",
};
const issuer = `https://${env.ACCESS_TEAM_DOMAIN}`;
const { privateKey, publicKey } = await generateKeyPair("RS256");
const jwk = {
  ...(await exportJWK(publicKey)),
  kid: "test-key",
  alg: "RS256",
  use: "sig",
};
const originalFetch = globalThis.fetch;
globalThis.fetch = async (input) => {
  if (String(input) !== `${issuer}/cdn-cgi/access/certs`)
    throw new Error(`Unexpected fetch ${input}`);
  return Response.json({ keys: [jwk] });
};
after(() => {
  globalThis.fetch = originalFetch;
});
const req = (token) =>
  new Request("https://live.example.com/api/presenter/sessions", {
    headers: token ? { "Cf-Access-Jwt-Assertion": token } : {},
  });
async function token(overrides = {}) {
  return new SignJWT({ email: env.PRESENTER_EMAIL, ...overrides })
    .setProtectedHeader({ alg: "RS256", kid: "test-key" })
    .setIssuer(overrides.iss ?? issuer)
    .setAudience(overrides.aud ?? env.ACCESS_AUD)
    .setExpirationTime(overrides.exp ?? Math.floor(Date.now() / 1000) + 3600)
    .sign(privateKey);
}
test("valid signed Access JWT grants only allowlisted presenter", async () => {
  assert.ok((await presenter(req(await token()), env)) > Date.now() / 1000);
  for (const invalid of [
    { email: "someone@example.com" },
    { aud: "other-app" },
    { iss: "https://wrong.example.com" },
    { exp: 1 },
  ])
    await assert.rejects(
      () => token(invalid).then((t) => presenter(req(t), env)),
      /wygasła|dostępu/,
    );
  await assert.rejects(() => presenter(req("forged.token.signature"), env));
  await assert.rejects(() => presenter(req(), env));
});
test("production refuses missing configuration; local bypass requires explicit flag and loopback", async () => {
  await assert.rejects(
    () => presenter(req(), { ...env, ACCESS_AUD: "" }),
    /skonfigurowane/,
  );
  assert.equal(localRequest(req(), { ...env, DEV_AUTH: "local-only" }), false);
  assert.equal(localRequest(new Request("http://127.0.0.1:8787"), env), false);
  assert.equal(
    localRequest(new Request("http://127.0.0.1:8787"), {
      ...env,
      DEV_AUTH: "local-only",
    }),
    true,
  );
  assert.equal(
    localRequest(new Request("https://localhost.attacker.com"), {
      ...env,
      DEV_AUTH: "local-only",
    }),
    false,
  );
});
test("mutations require exact application origin", () => {
  assert.throws(() =>
    sameOrigin(
      new Request("https://live.example.com/api/sessions/x/join", {
        headers: { Origin: "https://attacker.example.com" },
      }),
      env,
    ),
  );
  assert.throws(() => sameOrigin(req(), env));
  assert.doesNotThrow(() =>
    sameOrigin(
      new Request("https://live.example.com/api/sessions/x/join", {
        headers: { Origin: env.APP_ORIGIN },
      }),
      env,
    ),
  );
});
