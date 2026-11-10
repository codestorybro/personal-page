import { DurableObject } from "cloudflare:workers";
import {
  boundedText,
  percentages,
  presentationSteps,
  HttpError,
  parseQuestions,
  type Choice,
  type Command,
  type Result,
  type SessionMeta,
  type Snapshot,
  type PublishedPresentation,
} from "../shared/protocol";
import type { Env } from "./env";

type Attachment = {
  role: "presenter" | "participant";
  participantId: string | null;
  expires: number;
  rateTokens?: number;
  rateAt?: number;
  connectedAt?: number;
  lastSeen?: number;
};
type VoteRow = { choice: Choice; seq: number };
const empty = (): Result => ({ A: 0, B: 0, total: 0 });

export class LiveSession extends DurableObject<Env> {
  private deleted = false;
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    const hadTallies =
      ctx.storage.sql
        .exec(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='tallies'",
        )
        .toArray().length > 0;
    ctx.storage.sql
      .exec(`CREATE TABLE IF NOT EXISTS metadata (id INTEGER PRIMARY KEY CHECK(id=1), json TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS reservations (participant_id TEXT PRIMARY KEY, expires INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS participants (id TEXT PRIMARY KEY, joined_at TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS votes (question_id TEXT NOT NULL, participant_id TEXT NOT NULL, choice TEXT NOT NULL, seq INTEGER NOT NULL, PRIMARY KEY(question_id, participant_id));
      CREATE TABLE IF NOT EXISTS round_history (question_id TEXT NOT NULL, round INTEGER NOT NULL, result TEXT NOT NULL, PRIMARY KEY(question_id, round));
      CREATE TABLE IF NOT EXISTS tallies (question_id TEXT PRIMARY KEY, a INTEGER NOT NULL, b INTEGER NOT NULL);`);
    if (!hadTallies)
      ctx.storage.sql.exec(
        "INSERT INTO tallies(question_id,a,b) SELECT question_id,SUM(choice='A'),SUM(choice='B') FROM votes GROUP BY question_id",
      );
    ctx.setWebSocketAutoResponse(
      new WebSocketRequestResponsePair("ping", "pong"),
    );
  }
  private read(allowDeleting = false): SessionMeta {
    if (this.deleted) throw new HttpError(410, "Sesja została usunięta.");
    const row = this.ctx.storage.sql
      .exec<{ json: string }>("SELECT json FROM metadata WHERE id=1")
      .toArray()[0];
    if (!row)
      throw new HttpError(404, "Nie ma takiej sesji. Sprawdź adres z kodu QR.");
    const meta = JSON.parse(row.json);
    if (meta.deleting && !allowDeleting)
      throw new HttpError(410, "Sesja jest usuwana.");
    return {
      ...meta,
      rounds: meta.rounds ?? {},
      navigationVersion: meta.navigationVersion ?? 0,
    };
  }
  private save(meta: SessionMeta) {
    meta.revision++;
    this.ctx.storage.sql.exec(
      "INSERT INTO metadata(id,json) VALUES(1,?) ON CONFLICT(id) DO UPDATE SET json=excluded.json",
      JSON.stringify(meta),
    );
  }
  async initialize(id: string, title: unknown, questions: unknown) {
    if (this.ctx.storage.sql.exec("SELECT id FROM metadata").toArray().length)
      throw new HttpError(409, "Sesja już istnieje.");
    const meta: SessionMeta = {
      id,
      title: boundedText(title, 160, "Tytuł"),
      questions: parseQuestions(questions),
      createdAt: new Date().toISOString(),
      status: "draft",
      activeId: null,
      closedIds: [],
      rounds: {},
      navigationVersion: 0,
      slide: 1,
      pageCount: 0,
      displayQuestionId: null,
      revision: 0,
      pdfKey: null,
      pdfName: null,
    };
    this.save(meta);
    await this.ctx.storage.sync();
    return this.summary();
  }
  summary() {
    if (
      this.deleted ||
      !this.ctx.storage.sql.exec("SELECT id FROM metadata WHERE id=1").toArray()
        .length
    )
      return null;
    const m = this.read(true);
    return {
      id: m.id,
      title: m.title,
      createdAt: m.createdAt,
      status: m.status,
      participants: this.onlineIds().size,
      questions: m.questions.length,
      totalParticipants: this.count(),
      deleting: !!m.deleting,
    };
  }
  private count() {
    return this.ctx.storage.sql
      .exec<{ n: number }>("SELECT COUNT(*) AS n FROM participants")
      .one().n;
  }
  private onlineIds(exclude?: WebSocket): Set<string> {
    const ids = new Set<string>();
    for (const ws of this.ctx.getWebSockets()) {
      if (ws === exclude || ws.readyState !== WebSocket.OPEN) continue;
      const a = ws.deserializeAttachment() as Attachment;
      const lastSeen = Math.max(
        a.lastSeen ?? a.connectedAt ?? 0,
        this.ctx.getWebSocketAutoResponseTimestamp(ws)?.getTime() ?? 0,
      );
      if (
        a.role === "participant" &&
        a.participantId &&
        a.expires > Date.now() / 1000 &&
        Date.now() - lastSeen <= 60000
      )
        ids.add(a.participantId);
    }
    return ids;
  }
  private reservePlace(id: string) {
    this.ctx.storage.sql.exec(
      "DELETE FROM reservations WHERE expires<=?",
      Date.now(),
    );
    const occupied = this.onlineIds();
    for (const r of this.ctx.storage.sql.exec<{ participant_id: string }>(
      "SELECT participant_id FROM reservations",
    ))
      occupied.add(r.participant_id);
    if (!occupied.has(id) && occupied.size >= 200)
      throw new HttpError(409, "W sesji jest już 200 połączonych uczestników.");
    if (!this.onlineIds().has(id))
      this.ctx.storage.sql.exec(
        "INSERT INTO reservations(participant_id,expires) VALUES(?,?) ON CONFLICT(participant_id) DO UPDATE SET expires=excluded.expires",
        id,
        Date.now() + 30000,
      );
  }
  private async presenceChanged() {
    if (this.deleted) return;
    let m: SessionMeta;
    try {
      m = this.read();
    } catch {
      return;
    }
    this.save(m);
    await this.ctx.storage.sync();
    this.broadcast(false);
  }
  async alarm() {
    if (this.deleted) return;
    try {
      this.read();
    } catch {
      return;
    }
    let changed = false;
    for (const ws of this.ctx.getWebSockets()) {
      const a = ws.deserializeAttachment() as Attachment;
      if (a.role !== "participant") continue;
      const lastSeen = Math.max(
        a.lastSeen ?? a.connectedAt ?? 0,
        this.ctx.getWebSocketAutoResponseTimestamp(ws)?.getTime() ?? 0,
      );
      if (Date.now() - lastSeen > 60000 || a.expires <= Date.now() / 1000) {
        ws.close(4002, "Brak odpowiedzi. Połącz ponownie.");
        changed = true;
      }
    }
    if (changed) await this.presenceChanged();
    this.ctx.storage.sql.exec(
      "DELETE FROM reservations WHERE expires<=?",
      Date.now(),
    );
    if (this.onlineIds().size)
      await this.ctx.storage.setAlarm(Date.now() + 30000);
  }
  async destroy(id: string) {
    if (!this.deleted) {
      const row = this.ctx.storage.sql
        .exec<{ json: string }>("SELECT json FROM metadata WHERE id=1")
        .toArray()[0];
      if (row && JSON.parse(row.json).status === "live")
        throw new HttpError(409, "Najpierw zakończ sesję.");
    }
    return this.ctx.blockConcurrencyWhile(async () => {
      if (!this.deleted) {
        const row = this.ctx.storage.sql
          .exec<{ json: string }>("SELECT json FROM metadata WHERE id=1")
          .toArray()[0];
        if (row) {
          const m = JSON.parse(row.json) as SessionMeta;
          m.deleting = true;
          this.save(m);
          await this.ctx.storage.sync();
        }
      }
      for (const ws of this.ctx.getWebSockets())
        ws.close(4004, "Sesja została usunięta.");
      await this.ctx.storage.deleteAlarm();
      // Include abandoned uploads, not just the PDF currently attached to metadata.
      let cursor: string | undefined;
      do {
        const listed = await this.env.PDFS.list({ prefix: `${id}/`, cursor });
        if (listed.objects.length)
          await this.env.PDFS.delete(
            listed.objects.map((object) => object.key),
          );
        cursor = listed.truncated ? listed.cursor : undefined;
      } while (cursor);
      const catalog = this.env.CATALOG.get(
        this.env.CATALOG.idFromName("presenter"),
      );
      // Keep empty schema for retries on this instance; remove every session record.
      this.ctx.storage.transactionSync(() => {
        for (const table of [
          "votes",
          "tallies",
          "round_history",
          "participants",
          "reservations",
          "metadata",
        ])
          this.ctx.storage.sql.exec(`DELETE FROM ${table}`);
      });
      await this.ctx.storage.sync();
      this.deleted = true;
      await catalog.purgeSession(id);
    });
  }
  private result(id: string, round = 1): Result {
    const key = round === 1 ? id : `${id}@${round}`;
    const row = this.ctx.storage.sql
      .exec<{
        a: number;
        b: number;
      }>("SELECT a,b FROM tallies WHERE question_id=?", key)
      .toArray()[0];
    return row ? { A: row.a, B: row.b, total: row.a + row.b } : empty();
  }

  snapshot(
    role: "presenter" | "participant",
    participantId: string | null = null,
  ): Snapshot {
    const m = this.read();
    const activeQuestion = m.questions.find((q) => q.id === m.activeId);
    const active = activeQuestion
      ? { ...activeQuestion, round: m.rounds[activeQuestion.id] ?? 1 }
      : null;
    const last = m.questions.find((q) => q.id === m.closedIds.at(-1));
    const vote =
      active && participantId
        ? (this.ctx.storage.sql
            .exec<VoteRow>(
              "SELECT choice, seq FROM votes WHERE question_id=? AND participant_id=?",
              active.round === 1 ? active.id : `${active.id}@${active.round}`,
              participantId,
            )
            .toArray()[0] ?? null)
        : null;
    return {
      type: "state",
      id: m.id,
      title: m.title,
      status: m.status,
      revision: m.revision,
      navigationVersion: m.navigationVersion,
      participants: this.onlineIds().size,
      slide: m.slide,
      pageCount: m.pageCount,
      displayQuestionId: m.displayQuestionId,
      active,
      lastClosed: last
        ? {
            ...last,
            result:
              role === "presenter"
                ? this.result(last.id, m.rounds[last.id] ?? 1)
                : percentages(this.result(last.id, m.rounds[last.id] ?? 1)),
          }
        : null,
      vote,
      ...(role === "presenter"
        ? {
            questions: m.questions,
            closedIds: m.closedIds,
            results: Object.fromEntries(
              m.questions.map((q) => [
                q.id,
                this.result(q.id, m.rounds[q.id] ?? 1),
              ]),
            ),
            history: Object.fromEntries(
              m.questions.map((q) => [
                q.id,
                this.ctx.storage.sql
                  .exec<{ round: number; result: string }>(
                    "SELECT round,result FROM round_history WHERE question_id=? ORDER BY round",
                    q.id,
                  )
                  .toArray()
                  .map((r) => ({
                    round: r.round,
                    result: JSON.parse(r.result),
                  })),
              ]),
            ),
            pdfName: m.pdfName,
            publishedAt: m.publication?.publishedAt ?? null,
          }
        : {}),
    };
  }
  async join(existing: string | null) {
    const m = this.read();
    if (existing && this.hasParticipant(existing)) {
      this.reservePlace(existing);
      await this.ctx.storage.sync();
      return {
        participantId: existing,
        state: this.snapshot("participant", existing),
      };
    }
    if (m.status === "ended")
      throw new HttpError(410, "Ta sesja już się zakończyła.");
    const participantId = crypto.randomUUID();
    this.reservePlace(participantId);
    this.ctx.storage.sql.exec(
      "INSERT INTO participants(id,joined_at) VALUES(?,?)",
      participantId,
      new Date().toISOString(),
    );
    this.save(m);
    await this.ctx.storage.sync();
    return {
      participantId,
      state: this.snapshot("participant", participantId),
    };
  }
  private hasParticipant(id: string) {
    return (
      this.ctx.storage.sql
        .exec("SELECT id FROM participants WHERE id=?", id)
        .toArray().length > 0
    );
  }
  async edit(title: unknown, questions: unknown) {
    const m = this.read();
    if (m.status !== "draft")
      throw new HttpError(
        409,
        "Pytania można edytować przed rozpoczęciem sesji.",
      );
    const parsed = parseQuestions(questions);
    if (m.pageCount && parsed.some((q) => q.slide > m.pageCount))
      throw new HttpError(400, "Pytanie wskazuje slajd poza prezentacją.");
    m.title = boundedText(title, 160, "Tytuł");
    m.questions = parsed;
    this.save(m);
    await this.ctx.storage.sync();
    this.broadcast(true);
    return this.snapshot("presenter");
  }
  pdfInfo() {
    const m = this.read();
    return { key: m.pdfKey, name: m.pdfName, status: m.status };
  }
  publicationInfo() {
    const m = this.read();
    if (m.status !== "ended" || !m.publication)
      throw new HttpError(404, "Ta prezentacja nie jest udostępniona.");
    return { key: m.publication.key };
  }
  async publish(key: string, sourceKey: string) {
    return this.ctx.blockConcurrencyWhile(async () => {
      const m = this.read();
      if (m.status !== "ended" || !m.pdfKey || m.pdfKey !== sourceKey)
        throw new HttpError(
          409,
          "Udostępnić można tylko zakończoną sesję z PDF-em.",
        );
      if (m.publication)
        throw new HttpError(409, "Prezentacja jest już udostępniona.");
      const publishedAt = new Date().toISOString();
      const catalog = this.env.CATALOG.get(
        this.env.CATALOG.idFromName("presenter"),
      );
      await catalog.publish({
        id: m.id,
        title: m.title,
        publishedAt,
        pages: m.pageCount + m.questions.length,
      });
      m.publication = { key, publishedAt };
      this.save(m);
      await this.ctx.storage.sync();
      this.broadcast(false);
      return this.snapshot("presenter");
    });
  }
  async unpublish() {
    return this.ctx.blockConcurrencyWhile(async () => {
      const m = this.read();
      const catalog = this.env.CATALOG.get(
        this.env.CATALOG.idFromName("presenter"),
      );
      await catalog.unpublish(m.id);
      if (m.publication) {
        // Remove the downloadable copy before clearing its reference, so retries can finish cleanup.
        await this.env.PDFS.delete(m.publication.key);
        await catalog.release(m.publication.key);
        m.publication = null;
        this.save(m);
        await this.ctx.storage.sync();
        this.broadcast(false);
      }
      return this.snapshot("presenter");
    });
  }
  async attachPdf(key: string, name: string, pageCount: number) {
    const m = this.read();
    if (m.status !== "draft" || m.pdfKey)
      throw new HttpError(
        409,
        "PDF można dodać raz przed rozpoczęciem. Usuń poprzedni plik, aby go zastąpić.",
      );
    if (m.questions.some((q) => q.slide > pageCount))
      throw new HttpError(400, "Pytanie wskazuje slajd poza prezentacją.");
    m.pdfKey = key;
    m.pdfName = name;
    m.pageCount = pageCount;
    this.save(m);
    await this.ctx.storage.sync();
    this.broadcast(true);
  }
  async removePdf(expectedKey: string) {
    const m = this.read();
    if (m.status === "live")
      throw new HttpError(409, "Nie można usunąć PDF podczas sesji.");
    if (m.pdfKey !== expectedKey) return;
    if (m.publication)
      throw new HttpError(409, "Najpierw wycofaj udostępnienie prezentacji.");
    m.pdfKey = null;
    m.pdfName = null;
    m.pageCount = 0;
    this.save(m);
    await this.ctx.storage.sync();
    this.broadcast(true);
  }
  async command(input: Command) {
    const m = this.read();
    if (!input || typeof input !== "object")
      throw new HttpError(400, "Niepoprawne polecenie.");
    switch (input.type) {
      case "start":
        if (m.status === "live") return this.snapshot("presenter");
        if (m.status !== "draft" || !m.pdfKey)
          throw new HttpError(409, "Najpierw dodaj prezentację PDF.");
        m.status = "live";
        break;
      case "open":
        if (m.status !== "live")
          throw new HttpError(409, "Najpierw rozpocznij sesję.");
        if (m.activeId === input.questionId) return this.snapshot("presenter");
        if (m.activeId)
          throw new HttpError(409, "Najpierw zamknij bieżące pytanie.");
        if (!m.questions.some((q) => q.id === input.questionId))
          throw new HttpError(404, "Pytanie nie istnieje.");
        if (m.closedIds.includes(input.questionId)) {
          const round = m.rounds[input.questionId] ?? 1;
          this.ctx.storage.sql.exec(
            "INSERT OR IGNORE INTO round_history(question_id,round,result) VALUES(?,?,?)",
            input.questionId,
            round,
            JSON.stringify(this.result(input.questionId, round)),
          );
          m.rounds[input.questionId] = round + 1;
          m.closedIds = m.closedIds.filter((id) => id !== input.questionId);
        }
        m.slide = m.questions.find((q) => q.id === input.questionId)!.slide;
        m.activeId = input.questionId;
        m.displayQuestionId = input.questionId;
        break;
      case "show-question": {
        if (m.status !== "live")
          throw new HttpError(409, "Najpierw rozpocznij sesję.");
        const question = m.questions.find((q) => q.id === input.questionId);
        if (!question) throw new HttpError(404, "Pytanie nie istnieje.");
        if (!m.closedIds.includes(question.id) && m.activeId !== question.id)
          throw new HttpError(409, "Najpierw otwórz pytanie.");
        m.slide = question.slide;
        m.displayQuestionId = question.id;
        break;
      }
      case "close":
        if (!m.activeId) return this.snapshot("presenter");
        m.closedIds.push(m.activeId);
        m.activeId = null;
        break;
      case "end":
        if (m.status === "ended") return this.snapshot("presenter");
        if (m.activeId) {
          m.closedIds.push(m.activeId);
          m.activeId = null;
        }
        m.status = "ended";
        break;
      case "navigate": {
        if (m.status !== "live")
          throw new HttpError(409, "Najpierw rozpocznij sesję.");
        if (input.direction !== 1 && input.direction !== -1)
          throw new HttpError(400, "Niepoprawny kierunek.");
        if (input.navigationVersion !== m.navigationVersion)
          return this.snapshot("presenter");
        if (
          input.direction === 1 &&
          m.activeId &&
          m.displayQuestionId === m.activeId
        ) {
          m.closedIds = [
            ...m.closedIds.filter((id) => id !== m.activeId),
            m.activeId,
          ];
          m.activeId = null;
        } else {
          const steps = presentationSteps(m.pageCount, m.questions);
          const index = steps.findIndex(
            (step) =>
              step.slide === m.slide && step.questionId === m.displayQuestionId,
          );
          const target = steps[index + input.direction];
          if (!target) return this.snapshot("presenter");
          m.slide = target.slide;
          m.displayQuestionId = target.questionId;
          if (target.questionId && !m.closedIds.includes(target.questionId)) {
            if (m.activeId && m.activeId !== target.questionId)
              m.closedIds.push(m.activeId);
            m.activeId = target.questionId;
          }
        }
        break;
      }
      case "slide":
        if (
          !Number.isInteger(input.slide) ||
          input.slide < 1 ||
          input.slide > m.pageCount
        )
          throw new HttpError(400, "Niepoprawny numer slajdu.");
        if (m.status === "ended") throw new HttpError(409, "Sesja zakończona.");
        m.slide = input.slide;
        m.displayQuestionId = null;
        break;
      default:
        throw new HttpError(400, "Nieznane polecenie.");
    }
    m.navigationVersion++;
    this.save(m);
    await this.ctx.storage.sync();
    this.broadcast(true);
    return this.snapshot("presenter");
  }
  private async vote(participantId: string, input: Record<string, unknown>) {
    if (
      (input.choice !== "A" && input.choice !== "B") ||
      typeof input.questionId !== "string" ||
      !Number.isSafeInteger(input.seq) ||
      Number(input.seq) < 1
    )
      throw new HttpError(400, "Niepoprawny głos.");
    const m = this.read();
    const round = m.rounds[input.questionId as string] ?? 1;
    if ((input.round ?? 1) !== round)
      throw new HttpError(409, "Ta runda głosowania już się zakończyła.");
    const voteKey =
      round === 1
        ? (input.questionId as string)
        : `${input.questionId}@${round}`;
    const previous = this.ctx.storage.sql
      .exec<VoteRow>(
        "SELECT choice, seq FROM votes WHERE question_id=? AND participant_id=?",
        voteKey,
        participantId,
      )
      .toArray()[0];
    // A retry of an already committed vote remains acknowledged after close.
    if (previous && Number(input.seq) <= previous.seq) {
      if (
        Number(input.seq) === previous.seq &&
        input.choice !== previous.choice
      )
        throw new HttpError(409, "Numer głosu został już użyty. Odśwież stan.");
      return { type: "ack", questionId: input.questionId, round, ...previous };
    }
    if (m.status !== "live" || m.activeId !== input.questionId)
      throw new HttpError(409, "Pytanie jest już zamknięte.");
    this.ctx.storage.transactionSync(() => {
      this.ctx.storage.sql.exec(
        "INSERT INTO votes(question_id,participant_id,choice,seq) VALUES(?,?,?,?) ON CONFLICT(question_id,participant_id) DO UPDATE SET choice=excluded.choice,seq=excluded.seq",
        voteKey,
        participantId,
        input.choice as string,
        Number(input.seq),
      );
      const deltaA =
        Number(input.choice === "A") - Number(previous?.choice === "A");
      const deltaB =
        Number(input.choice === "B") - Number(previous?.choice === "B");
      this.ctx.storage.sql.exec(
        "INSERT INTO tallies(question_id,a,b) VALUES(?,?,?) ON CONFLICT(question_id) DO UPDATE SET a=a+excluded.a,b=b+excluded.b",
        voteKey,
        deltaA,
        deltaB,
      );
      this.save(m);
    });
    await this.ctx.storage.sync();
    this.broadcast(false);
    return {
      type: "ack",
      questionId: input.questionId,
      round,
      choice: input.choice,
      seq: input.seq,
    };
  }
  async fetch(request: Request) {
    // Only the Worker binding can call this object; it builds these headers itself.
    try {
      if (request.headers.get("Upgrade")?.toLowerCase() !== "websocket")
        throw new HttpError(400, "Wymagane połączenie WebSocket.");
      this.read();
      const role =
        request.headers.get("x-live-role") === "presenter"
          ? "presenter"
          : "participant";
      const participantId = request.headers.get("x-live-participant");
      if (
        role === "participant" &&
        (!participantId || !this.hasParticipant(participantId))
      )
        throw new HttpError(401, "Dołącz ponownie do sesji.");
      if (role === "participant") this.reservePlace(participantId!);
      const tag = role === "presenter" ? "presenter" : participantId!;
      // Bound connections per identity; reconnects do not consume participant places.
      const previous = this.ctx.getWebSockets(tag);
      const cap = role === "presenter" ? 4 : 2;
      if (previous.length >= cap)
        previous[0].close(4000, "Otwarto nowsze połączenie.");
      const pair = new WebSocketPair();
      const [client, server] = Object.values(pair);
      this.ctx.acceptWebSocket(server, [tag]);
      server.serializeAttachment({
        role,
        participantId,
        connectedAt: Date.now(),
        lastSeen: Date.now(),
        expires:
          Number(request.headers.get("x-live-expires")) ||
          Math.floor(Date.now() / 1000) + 86400,
      } satisfies Attachment);
      if (role === "participant") {
        this.ctx.storage.sql.exec(
          "DELETE FROM reservations WHERE participant_id=?",
          participantId!,
        );
        await this.presenceChanged();
        if ((await this.ctx.storage.getAlarm()) === null)
          await this.ctx.storage.setAlarm(Date.now() + 30000);
      }
      server.send(JSON.stringify(this.snapshot(role, participantId)));
      return new Response(null, { status: 101, webSocket: client });
    } catch (e) {
      return errorResponse(e);
    }
  }
  private valid(ws: WebSocket): Attachment | null {
    const a = ws.deserializeAttachment() as Attachment;
    if (a.expires <= Date.now() / 1000) {
      ws.close(4001, "Sesja wygasła.");
      return null;
    }
    return a;
  }
  async webSocketMessage(ws: WebSocket, message: string | ArrayBuffer) {
    let requestMessage: Record<string, unknown> | undefined;
    try {
      const a = this.valid(ws);
      if (!a) return;
      if (typeof message !== "string" || message.length > 2048) {
        ws.close(1009, "Wiadomość za duża.");
        return;
      }
      const input = JSON.parse(message);
      if (!input || typeof input !== "object")
        throw new HttpError(400, "Niepoprawna wiadomość.");
      requestMessage = input;
      const now = Date.now();
      const tokens = Math.min(
        4,
        (a.rateTokens ?? 4) + (now - (a.rateAt ?? now)) / 500,
      );
      if (tokens < 1)
        throw new HttpError(429, "Zaczekaj chwilę przed kolejnym głosem.");
      a.rateTokens = tokens - 1;
      a.rateAt = now;
      a.lastSeen = now;
      ws.serializeAttachment(a);
      if (input.type === "sync")
        ws.send(JSON.stringify(this.snapshot(a.role, a.participantId)));
      else if (
        input.type === "vote" &&
        a.role === "participant" &&
        a.participantId
      )
        ws.send(JSON.stringify(await this.vote(a.participantId, input)));
      else throw new HttpError(400, "Nieznana wiadomość.");
    } catch (e) {
      ws.send(
        JSON.stringify({
          type: "error",
          questionId: requestMessage?.questionId,
          round: requestMessage?.round ?? 1,
          code: e instanceof HttpError ? e.status : 400,
          message: e instanceof Error ? e.message : "Błąd serwera.",
        }),
      );
    }
  }
  async webSocketClose(ws: WebSocket, code: number) {
    ws.close(code === 1006 ? 1000 : code);
    await this.presenceChanged();
  }
  async webSocketError(ws: WebSocket) {
    ws.close(1011, "Połącz ponownie.");
    await this.presenceChanged();
  }
  private broadcast(everyone: boolean) {
    let presenterState: string | undefined;
    for (const ws of this.ctx.getWebSockets()) {
      try {
        const a = this.valid(ws);
        if (!a || (!everyone && a.role !== "presenter")) continue;
        if (a.role === "presenter") {
          presenterState ??= JSON.stringify(this.snapshot("presenter"));
          ws.send(presenterState);
        } else
          ws.send(
            JSON.stringify(this.snapshot("participant", a.participantId)),
          );
      } catch {
        /* closed between enumeration and send */
      }
    }
  }
}

export class Catalog extends DurableObject<Env> {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    ctx.storage.sql.exec(
      "CREATE TABLE IF NOT EXISTS sessions(id TEXT PRIMARY KEY, created_at TEXT NOT NULL); CREATE TABLE IF NOT EXISTS files(key TEXT PRIMARY KEY, bytes INTEGER NOT NULL); CREATE TABLE IF NOT EXISTS publications(id TEXT PRIMARY KEY, json TEXT NOT NULL);",
    );
  }
  published(): PublishedPresentation[] {
    return this.ctx.storage.sql
      .exec<{ json: string }>(
        "SELECT json FROM publications ORDER BY json_extract(json, '$.publishedAt') DESC",
      )
      .toArray()
      .map((r) => JSON.parse(r.json));
  }
  async publish(item: PublishedPresentation) {
    this.ctx.storage.sql.exec(
      "INSERT INTO publications(id,json) VALUES(?,?) ON CONFLICT(id) DO UPDATE SET json=excluded.json",
      item.id,
      JSON.stringify(item),
    );
    await this.ctx.storage.sync();
  }
  async unpublish(id: string) {
    this.ctx.storage.sql.exec("DELETE FROM publications WHERE id=?", id);
    await this.ctx.storage.sync();
  }
  list() {
    return this.ctx.storage.sql
      .exec<{ id: string }>("SELECT id FROM sessions ORDER BY created_at DESC")
      .toArray()
      .map((r) => r.id);
  }
  async add(id: string) {
    if (this.list().length >= 100)
      throw new HttpError(409, "Limit MVP: 100 sesji w archiwum.");
    this.ctx.storage.sql.exec(
      "INSERT OR IGNORE INTO sessions(id,created_at) VALUES(?,?)",
      id,
      new Date().toISOString(),
    );
    await this.ctx.storage.sync();
  }
  async remove(id: string) {
    this.ctx.storage.sql.exec("DELETE FROM sessions WHERE id=?", id);
    await this.ctx.storage.sync();
  }
  async purgeSession(id: string) {
    this.ctx.storage.transactionSync(() => {
      this.ctx.storage.sql.exec(
        "DELETE FROM files WHERE key LIKE ?",
        `${id}/%`,
      );
      this.ctx.storage.sql.exec("DELETE FROM sessions WHERE id=?", id);
      this.ctx.storage.sql.exec("DELETE FROM publications WHERE id=?", id);
    });
    await this.ctx.storage.sync();
  }
  async reserve(key: string, bytes: number) {
    const total = this.ctx.storage.sql
      .exec<{ n: number }>("SELECT COALESCE(SUM(bytes),0) AS n FROM files")
      .one().n;
    if (total + bytes > 1_000_000_000)
      throw new HttpError(
        409,
        "Archiwum PDF osiągnęło limit 1 GB. Usuń niepotrzebne PDF-y.",
      );
    this.ctx.storage.sql.exec(
      "INSERT INTO files(key,bytes) VALUES(?,?)",
      key,
      bytes,
    );
    await this.ctx.storage.sync();
  }
  async release(key: string) {
    this.ctx.storage.sql.exec("DELETE FROM files WHERE key=?", key);
    await this.ctx.storage.sync();
  }
}
export function errorResponse(error: unknown) {
  // Errors crossing RPC retain their message, but not custom prototype/properties.
  return Response.json(
    { error: error instanceof Error ? error.message : "Błąd serwera." },
    { status: error instanceof HttpError ? error.status : 400 },
  );
}
