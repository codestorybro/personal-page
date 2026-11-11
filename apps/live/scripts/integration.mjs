import assert from "node:assert/strict";
import {
  startServer,
  request,
  connect,
  delay,
  uploadPdf,
  samplePdf,
} from "./harness.mjs";
const server = await startServer();
const { origin } = server;
const clients = [];
try {
  const questions = [
    { id: "q1", slide: 1, text: "A czy B?", a: "A", b: "B" },
    { id: "q2", slide: 2, text: "Drugie?", a: "A2", b: "B2" },
  ];
  const created = await request(origin, "/api/presenter/sessions", "POST", {
    title: "Integration",
    questions,
  });
  assert.equal(created.response.status, 201);
  const id = created.data.id;
  const base = `/api/presenter/sessions/${id}`;
  const command = (cmd) => request(origin, `${base}/commands`, "POST", cmd);
  // Cross-origin writes and all anonymous presenter calls must fail outside local bypass.
  const csrf = await fetch(`${origin}${base}/commands`, {
    method: "POST",
    headers: {
      Origin: "https://attacker.invalid",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "start" }),
  });
  assert.equal(csrf.status, 403);
  assert.equal((await command({ type: "start" })).response.ok, false);
  const invalidPdf = await fetch(`${origin}${base}/pdf`, {
    method: "POST",
    headers: {
      Origin: origin,
      "Content-Type": "application/pdf",
      "X-Pdf-Pages": "1",
      "X-Pdf-Name": "invalid.pdf",
    },
    body: "not a PDF",
  });
  assert.equal(invalidPdf.ok, false);
  await uploadPdf(origin, id);
  assert.equal((await fetch(`${origin}/api/sessions/${id}/pdf`)).status, 401);
  const pdf = await fetch(`${origin}${base}/pdf`, {
    headers: { Range: "bytes=0-4" },
  });
  assert.equal(pdf.status, 206);
  assert.equal(await pdf.text(), "%PDF-");
  const publicPath = `/api/presentations/${id}/pdf`;
  const share = () =>
    fetch(`${origin}${base}/publication`, {
      method: "POST",
      headers: { Origin: origin, "Content-Type": "application/pdf" },
      body: samplePdf(2),
    });
  assert.deepEqual((await request(origin, "/api/presentations")).data, []);
  assert.equal((await fetch(`${origin}${publicPath}`)).ok, false);
  assert.equal((await share()).ok, false); // draft cannot be shared
  assert.equal((await command({ type: "start" })).response.ok, true);
  assert.equal((await share()).ok, false); // live cannot be shared
  const joins = await Promise.all(
    Array.from({ length: 1000 }, () =>
      request(origin, `/api/sessions/${id}/join`, "POST"),
    ),
  );
  assert.ok(joins.every((j) => j.response.ok));
  const full = await request(origin, `/api/sessions/${id}/join`, "POST");
  assert.equal(full.response.ok, false);
  assert.match(full.data.error, /1000/);
  const again = await request(
    origin,
    `/api/sessions/${id}/join`,
    "POST",
    undefined,
    joins[0].cookie,
  );
  assert.equal(again.response.ok, true);
  assert.equal(again.data.participants, 0);
  console.log(
    "PASS: 1000 joins, 1001st rejected, existing identity restored; PDF private; CSRF rejected.",
  );
  const admin = await connect(origin, id, null, true);
  clients.push(admin);
  await command({ type: "open", questionId: "q1" });
  const sockets = await Promise.all(
    joins.map((j) => connect(origin, id, j.cookie)),
  );
  clients.push(...sockets);
  for (const client of sockets) {
    const initial = await client.next((m) => m.type === "state");
    assert.equal(initial.active.id, "q1");
    assert.equal(initial.questions, undefined);
    assert.equal(initial.results, undefined);
    client.send({ type: "vote", questionId: "q1", choice: "A", seq: 1 });
  }
  await Promise.all(
    sockets.map((s) => s.next((m) => m.type === "ack" && m.seq === 1)),
  );
  let state = (await request(origin, base)).data;
  assert.equal(state.results.q1.A, 1000);
  assert.equal(state.peakParticipants, 1000);
  const participantState = (
    await request(
      origin,
      `/api/sessions/${id}/join`,
      "POST",
      undefined,
      joins[0].cookie,
    )
  ).data;
  assert.equal("peakParticipants" in participantState, false);
  await delay(180);
  sockets[0].send({ type: "vote", questionId: "q1", choice: "B", seq: 2 });
  await sockets[0].next((m) => m.type === "ack" && m.seq === 2);
  await delay(180);
  sockets[0].send({ type: "vote", questionId: "q1", choice: "B", seq: 2 });
  await sockets[0].next((m) => m.type === "ack" && m.seq === 2);
  state = (await request(origin, base)).data;
  assert.deepEqual(state.results.q1, { A: 999, B: 1, total: 1000 });
  async function expectOnline(expected) {
    for (let i = 0; i < 50; i++) {
      if ((await request(origin, base)).data.participants === expected) return;
      await delay(50);
    }
    assert.equal((await request(origin, base)).data.participants, expected);
  }
  await expectOnline(1000);
  const secondTab = await connect(origin, id, joins[0].cookie);
  clients.push(secondTab);
  await expectOnline(1000);
  secondTab.close();
  await delay(100);
  await expectOnline(1000);
  sockets[0].close();
  await expectOnline(999);
  assert.deepEqual((await request(origin, base)).data.results.q1, {
    A: 999,
    B: 1,
    total: 1000,
  });
  const replacement = await request(origin, `/api/sessions/${id}/join`, "POST");
  assert.equal(replacement.response.ok, true);
  const replacementSocket = await connect(origin, id, replacement.cookie);
  clients.push(replacementSocket);
  await expectOnline(1000);
  assert.equal(
    (
      await request(
        origin,
        `/api/sessions/${id}/join`,
        "POST",
        undefined,
        joins[0].cookie,
      )
    ).response.ok,
    false,
  );
  replacementSocket.close();
  await expectOnline(999);
  console.log(
    "PASS: live presence decreases, deduplicates tabs, frees capacity and preserves votes.",
  );
  const reconnected = await connect(origin, id, joins[0].cookie);
  clients.push(reconnected);
  const restored = await reconnected.next((m) => m.type === "state");
  assert.deepEqual(restored.vote, { choice: "B", seq: 2 });
  await command({ type: "close" });
  const closed = await reconnected.next(
    (m) => m.type === "state" && m.active === null,
  );
  assert.deepEqual(closed.lastClosed.result, { percentA: 100, percentB: 0 });
  assert.equal(closed.lastClosed.result.total, undefined);
  reconnected.send({ type: "vote", questionId: "q1", choice: "B", seq: 2 });
  await reconnected.next((m) => m.type === "ack" && m.seq === 2);
  await delay(180);
  reconnected.send({ type: "vote", questionId: "q1", choice: "A", seq: 3 });
  assert.match(
    (await reconnected.next((m) => m.type === "error")).message,
    /zamknięte/,
  );
  assert.equal(
    (await command({ type: "open", questionId: "q1" })).response.ok,
    true,
  );
  console.log(
    "PASS: 1000 simultaneous votes, A → B, idempotent retry, reconnect, close and late vote rejection.",
  );
  state = (await request(origin, base)).data;
  assert.equal(state.active.round, 2);
  assert.deepEqual(state.results.q1, { A: 0, B: 0, total: 0 });
  assert.deepEqual(state.history.q1, [
    { round: 1, result: { A: 999, B: 1, total: 1000 } },
  ]);
  const roundTwo = await reconnected.next(
    (m) => m.type === "state" && m.active?.round === 2,
  );
  assert.equal(roundTwo.vote, null);
  await delay(600);
  reconnected.send({
    type: "vote",
    questionId: "q1",
    round: 1,
    choice: "B",
    seq: 2,
  });
  assert.match(
    (await reconnected.next((m) => m.type === "error")).message,
    /runda/,
  );
  await delay(600);
  reconnected.send({
    type: "vote",
    questionId: "q1",
    round: 2,
    choice: "A",
    seq: 1,
  });
  await reconnected.next((m) => m.type === "ack" && m.round === 2);
  await command({ type: "close" });
  console.log(
    "PASS: reopening starts a fresh round, archives previous result and rejects stale-round votes.",
  );
  await command({ type: "open", questionId: "q2" });
  await delay(180);
  const race = sockets.slice(1).map((s) => {
    s.send({ type: "vote", questionId: "q2", choice: "B", seq: 1 });
    return s.next(
      (m) => (m.type === "ack" && m.questionId === "q2") || m.type === "error",
    );
  });
  await command({ type: "close" });
  const outcomes = await Promise.all(race);
  const acknowledged = outcomes.filter((m) => m.type === "ack").length;
  state = (await request(origin, base)).data;
  assert.equal(state.results.q2.total, acknowledged);
  await command({ type: "end" });
  state = (await request(origin, base)).data;
  assert.equal(state.status, "ended");
  assert.equal(state.results.q1.total, 1);
  assert.equal(state.history.q1[0].result.total, 1000);
  assert.equal(state.peakParticipants, 1000);
  assert.equal((await request(origin, base)).data.peakParticipants, 1000);
  assert.equal(
    (await request(origin, "/api/presenter/sessions")).data.find(
      (s) => s.id === id,
    ).peakParticipants,
    1000,
  );
  const csv = await (await fetch(`${origin}${base}/export`)).text();
  assert.match(csv, /999,|"999"/);
  assert.equal(
    (await request(origin, `/api/sessions/${id}/join`, "POST")).response.ok,
    false,
  );
  console.log(
    `PASS: close/vote race (${acknowledged} confirmed, all archived), final results and CSV.`,
  );
  // Multiple questions after one slide, including the final PDF page.
  const flow = (
    await request(origin, "/api/presenter/sessions", "POST", {
      title: "Automatic flow",
      questions: [
        { id: "a", slide: 1, text: "First", a: "A", b: "B" },
        { id: "b", slide: 1, text: "Second", a: "A", b: "B" },
        { id: "c", slide: 2, text: "Last", a: "A", b: "B" },
      ],
    })
  ).data;
  await uploadPdf(origin, flow.id);
  const flowBase = `/api/presenter/sessions/${flow.id}`;
  let f = (
    await request(origin, `${flowBase}/commands`, "POST", { type: "start" })
  ).data;
  async function next(direction = 1) {
    f = (
      await request(origin, `${flowBase}/commands`, "POST", {
        type: "navigate",
        direction,
        navigationVersion: f.navigationVersion,
      })
    ).data;
    return f;
  }
  const originalVersion = f.navigationVersion;
  await next();
  assert.equal(f.active.id, "a");
  assert.equal(f.slide, 1);
  const duplicate = (
    await request(origin, `${flowBase}/commands`, "POST", {
      type: "navigate",
      direction: 1,
      navigationVersion: originalVersion,
    })
  ).data;
  assert.equal(duplicate.active.id, "a");
  await next();
  assert.equal(f.active, null);
  assert.equal(f.displayQuestionId, "a");
  await next();
  assert.equal(f.active.id, "b");
  await next();
  await next();
  assert.equal(f.slide, 2);
  assert.equal(f.displayQuestionId, null);
  await next();
  assert.equal(f.active.id, "c");
  await next();
  await next(); // Final question stays at the end of the presentation.
  assert.equal(f.displayQuestionId, "c");
  assert.equal(f.active, null);
  await next(-1);
  assert.equal(f.displayQuestionId, null);
  assert.equal(f.slide, 2);
  await next(-1);
  assert.equal(f.displayQuestionId, "b");
  assert.equal(f.active, null);
  await next(-1);
  assert.equal(f.displayQuestionId, "a");
  assert.equal(f.active, null);
  await next(-1);
  assert.equal(f.displayQuestionId, null);
  assert.equal(f.slide, 1);
  await next();
  assert.equal(f.displayQuestionId, "a");
  assert.equal(f.active, null);
  await next();
  assert.equal(f.displayQuestionId, "b");
  assert.equal(f.active, null);
  await next();
  assert.equal(f.displayQuestionId, null);
  assert.equal(f.slide, 2);
  f = (
    await request(origin, `${flowBase}/commands`, "POST", {
      type: "open",
      questionId: "a",
    })
  ).data;
  assert.equal(f.active.round, 2);
  assert.equal(f.slide, 1);
  await next(-1);
  assert.equal(f.displayQuestionId, null);
  assert.equal(f.active.id, "a");
  await next();
  assert.equal(f.displayQuestionId, "a");
  assert.equal(f.active.round, 2);
  f = (
    await request(origin, `${flowBase}/commands`, "POST", {
      type: "show-question",
      questionId: "b",
    })
  ).data;
  assert.equal(f.displayQuestionId, "b");
  assert.equal(f.active.id, "a");
  assert.equal(f.history.b.length, 0);
  console.log(
    "PASS: automatic question order, last-slide question, close/result/advance, backward navigation and duplicate navigation.",
  );
  assert.equal((await request(origin, flowBase, "DELETE")).response.ok, false); // live session
  const noAuthDelete = await request(origin, `/api/sessions/${id}`, "DELETE");
  assert.equal(noAuthDelete.response.ok, false);
  assert.equal((await share()).ok, true);
  assert.equal((await share()).ok, false); // no accidental replacement
  const publications = (await request(origin, "/api/presentations")).data;
  assert.equal(publications.length, 1);
  assert.deepEqual(Object.keys(publications[0]).sort(), [
    "id",
    "pages",
    "publishedAt",
    "title",
  ]);
  assert.equal((await fetch(`${origin}${publicPath}`)).status, 200);
  assert.equal(
    (await request(origin, `${base}/pdf`, "DELETE")).response.ok,
    false,
  ); // withdraw first
  assert.equal(
    (await request(origin, `${base}/publication`, "DELETE")).response.ok,
    true,
  );
  assert.deepEqual((await request(origin, "/api/presentations")).data, []);
  assert.equal((await fetch(`${origin}${publicPath}`)).ok, false);
  assert.equal((await share()).ok, true);
  assert.equal((await request(origin, base, "DELETE")).response.ok, true);
  assert.equal((await request(origin, base, "DELETE")).response.ok, true); // retry is safe
  const list = (await request(origin, "/api/presenter/sessions")).data;
  assert.equal(
    list.some((session) => session.id === id),
    false,
  );
  assert.equal((await request(origin, base)).response.ok, false);
  assert.equal((await fetch(`${origin}${base}/pdf`)).ok, false);
  assert.equal((await fetch(`${origin}${base}/export`)).ok, false);
  assert.equal(
    (
      await request(
        origin,
        `/api/sessions/${id}/join`,
        "POST",
        undefined,
        joins[0].cookie,
      )
    ).response.ok,
    false,
  );
  assert.deepEqual((await request(origin, "/api/presentations")).data, []);
  assert.equal((await fetch(`${origin}${publicPath}`)).ok, false);
  console.log(
    "PASS: only ended sessions can be shared; public metadata is minimal; withdrawal and deletion remove access.",
  );
  console.log(
    "PASS: archive deletion is authorized, retryable, removes the catalog entry and denies PDF, results and participant access.",
  );
} finally {
  for (const client of clients) client.close();
  await server.stop();
}

const production = await startServer(8792, "");
try {
  const denied = await fetch(`${production.origin}/api/presenter/sessions`, {
    headers: {
      "Cf-Access-Authenticated-User-Email": "fake@example.com",
      "Cf-Access-Jwt-Assertion": "fake",
    },
  });
  assert.equal(denied.status, 503);
  assert.equal((await fetch(`${production.origin}/presenter`)).status, 503);
  assert.equal(
    (
      await fetch(
        `${production.origin}/presenter/00000000-0000-0000-0000-000000000000/screen`,
      )
    ).status,
    503,
  );
  assert.equal((await fetch(`${production.origin}/api/health`)).status, 200);
  assert.equal(
    (await fetch(`${production.origin}/api/presentations`)).status,
    200,
  );
  const unauthorizedShare = await fetch(
    `${production.origin}/api/presenter/sessions/00000000-0000-0000-0000-000000000000/publication`,
    {
      method: "POST",
      headers: { Origin: production.origin, "Content-Type": "application/pdf" },
      body: samplePdf(1),
    },
  );
  assert.equal(unauthorizedShare.ok, false);

  console.log(
    "PASS: production configuration fails closed without Access; spoofed headers do not grant access.",
  );
} finally {
  await production.stop();
}
