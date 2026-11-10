import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import { performance } from "node:perf_hooks";
import { startServer, request, connect, delay, uploadPdf } from "./harness.mjs";
// Local-only by default. No automatic traffic to production or deployment.
const duration = Number(process.env.DURATION_SECONDS ?? 3600);
if (!Number.isFinite(duration) || duration < 20)
  throw new Error("DURATION_SECONDS must be at least 20.");
const server = await startServer(8793);
const { origin } = server;
const clients = [];
const latency = [];
const result = {
  durationSeconds: duration,
  participants: 200,
  questions: 10,
  acknowledged: 0,
  reconnects: 0,
  p95AckMs: 0,
  completed: false,
};
try {
  const questions = Array.from({ length: 10 }, (_, i) => ({
    id: `q${i}`,
    slide: i + 1,
    text: `Pytanie ${i + 1}`,
    a: "A",
    b: "B",
  }));
  const { data: session } = await request(
    origin,
    "/api/presenter/sessions",
    "POST",
    { title: "Local load test", questions },
  );
  const base = `/api/presenter/sessions/${session.id}`;
  await uploadPdf(origin, session.id, 10);
  const command = async (body) => {
    const r = await request(origin, `${base}/commands`, "POST", body);
    assert.ok(r.response.ok, JSON.stringify(r.data));
  };
  await command({ type: "start" });
  const joins = await Promise.all(
    Array.from({ length: 200 }, () =>
      request(origin, `/api/sessions/${session.id}/join`, "POST"),
    ),
  );
  assert.ok(joins.every((j) => j.response.ok));
  clients.push(
    ...(await Promise.all(
      joins.map((j) => connect(origin, session.id, j.cookie)),
    )),
  );
  const began = performance.now();
  for (let round = 0; round < 10; round++) {
    await command({ type: "open", questionId: `q${round}` });
    await Promise.all(
      clients.map(async (client, i) => {
        await client.next(
          (m) => m.type === "state" && m.active?.id === `q${round}`,
        );
        const start = performance.now();
        client.send({
          type: "vote",
          questionId: `q${round}`,
          choice: "A",
          seq: round * 2 + 1,
        });
        await client.next((m) => m.type === "ack" && m.seq === round * 2 + 1);
        latency.push(performance.now() - start);
        result.acknowledged++;
        await delay(200 + (i % 10) * 10);
        client.send({
          type: "vote",
          questionId: `q${round}`,
          choice: "B",
          seq: round * 2 + 2,
        });
        await client.next((m) => m.type === "ack" && m.seq === round * 2 + 2);
        result.acknowledged++;
      }),
    );
    // Reconnect ten clients while voting is open and check restored choice.
    for (let i = 0; i < 10; i++) {
      const index = (round * 10 + i) % 200;
      clients[index].close();
      clients[index] = await connect(origin, session.id, joins[index].cookie);
      const state = await clients[index].next((m) => m.type === "state");
      assert.equal(state.vote.choice, "B");
      result.reconnects++;
    }
    await command({ type: "close" });
    const state = (await request(origin, base)).data;
    assert.deepEqual(state.results[`q${round}`], { A: 0, B: 200, total: 200 });
    console.log(
      `Question ${round + 1}/10: 200 votes, 200 changes, 10 reconnects; consistent results.`,
    );
    const target = began + ((round + 1) * duration * 1000) / 10;
    while (performance.now() < target) {
      clients.forEach((c) => c.ws.send("ping"));
      await delay(Math.min(15000, target - performance.now()));
    }
  }
  await command({ type: "end" });
  const archive = (await request(origin, base)).data;
  for (const q of questions) assert.equal(archive.results[q.id].B, 200);
  latency.sort((a, b) => a - b);
  result.p95AckMs = Math.round(latency[Math.floor(latency.length * 0.95)]);
  result.completed = true;
  console.log(JSON.stringify(result, null, 2));
  await writeFile(
    "load-results.json",
    JSON.stringify(
      {
        ...result,
        finishedAt: new Date().toISOString(),
        environment: "local workerd; not a Cloudflare quota measurement",
      },
      null,
      2,
    ),
  );
} finally {
  clients.forEach((c) => c.close());
  await server.stop();
}
