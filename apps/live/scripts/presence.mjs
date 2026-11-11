import assert from "node:assert/strict";
import { startServer, request, connect } from "./harness.mjs";
const server = await startServer(8795);
const clients = [];
let heartbeat;
try {
  const { origin } = server;
  const session = (
    await request(origin, "/api/presenter/sessions", "POST", {
      title: "Heartbeat timeout",
      questions: [],
    })
  ).data;
  const admin = await connect(origin, session.id, null, true);
  clients.push(admin);
  const one = await request(origin, `/api/sessions/${session.id}/join`, "POST");
  const two = await request(origin, `/api/sessions/${session.id}/join`, "POST");
  const alive = await connect(origin, session.id, one.cookie);
  clients.push(alive);
  const silent = await connect(origin, session.id, two.cookie);
  clients.push(silent);
  await admin.next((m) => m.type === "state" && m.participants === 2);
  admin.messages.length = 0;
  heartbeat = setInterval(() => alive.ws.send("ping"), 15000);
  console.log(
    "Two participants connected; one sends heartbeats, one stays silent. Waiting for server-side expiry.",
  );
  const update = await admin.next(
    (m) => m.type === "state" && m.participants === 1,
    95000,
  );
  assert.equal(update.participants, 1);
  const summary = (await request(origin, "/api/presenter/sessions")).data.find(
    (s) => s.id === session.id,
  );
  assert.equal(summary.totalParticipants, 2);
  assert.equal(summary.participants, 1);
  console.log(
    "PASS: silent connection expires and presenter receives the lower live count; responding participant stays connected and historical identities remain.",
  );
} finally {
  clearInterval(heartbeat);
  clients.forEach((c) => c.close());
  await server.stop();
}
