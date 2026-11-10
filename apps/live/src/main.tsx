import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { createRoot } from "react-dom/client";
import QRCode from "qrcode";
import { Footer } from "../../../packages/ui/Footer";
import "../../../packages/ui/footer.css";
import type {
  Command,
  Question,
  Result,
  PublicResult,
  Snapshot,
  Summary,
  PublishedPresentation,
} from "../shared/protocol";
import { percentages, presentationSteps } from "../shared/protocol";
import { api, useLive } from "./api";
const LazyPdf = lazy(() =>
  import("./Pdf").then((module) => ({ default: module.Pdf })),
);
function Pdf(props: { url: string; page: number }) {
  return (
    <Suspense fallback={<p>Wczytywanie odtwarzacza PDF…</p>}>
      <LazyPdf {...props} />
    </Suspense>
  );
}
import "./style.css";

function Shell({
  children,
  badge = "LIVE",
}: {
  children: ReactNode;
  badge?: string;
}) {
  return (
    <>
      <header className="topbar">
        <a className="brand" href="/">
          CodeStoryBro<span className="live-tag">{badge}</span>
        </a>
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
}
function Notice({ children }: { children: ReactNode }) {
  return children ? (
    <p className="notice" role="alert">
      {children}
    </p>
  ) : null;
}
function Status({ connected }: { connected: boolean }) {
  return (
    <span className={`connection ${connected ? "online" : ""}`} role="status">
      <i />
      {connected ? "Połączono na żywo" : "Łączenie…"}
    </span>
  );
}
function Results({
  result,
  a,
  b,
  showCounts = false,
}: {
  result: Result | PublicResult;
  a: string;
  b: string;
  showCounts?: boolean;
}) {
  const publicResult = "total" in result ? percentages(result) : result;
  const counts = showCounts && "total" in result ? result : null;
  return (
    <div className="results">
      {(["A", "B"] as const).map((key) => {
        const percent =
          key === "A" ? publicResult.percentA : publicResult.percentB;
        return (
          <div className="result" key={key}>
            <div className="result-label">
              <span>
                <b>{key}</b> {key === "A" ? a : b}
              </span>
              <strong>
                {percent}% {counts && <small>({counts[key]})</small>}
              </strong>
            </div>
            <div className="bar">
              <div style={{ width: `${percent}%` }} />
            </div>
          </div>
        );
      })}
      {counts && (
        <p className="muted">
          {counts.total} {counts.total === 1 ? "głos" : "głosów"}
        </p>
      )}
    </div>
  );
}
function QR({ id, compact = false }: { id: string; compact?: boolean }) {
  const [data, setData] = useState("");
  const [copied, setCopied] = useState(false);
  const url = `${location.origin}/s/${id}`;
  useEffect(() => {
    void QRCode.toDataURL(url, {
      width: 320,
      margin: 2,
      errorCorrectionLevel: "M",
    }).then(setData);
  }, [url]);
  return (
    <section className={`qr-card ${compact ? "compact" : ""}`}>
      <div>
        {data && (
          <img
            src={data}
            alt="Kod QR dołączenia do tej sesji"
            width="180"
            height="180"
          />
        )}
      </div>
      <div>
        <p className="eyebrow">Zeskanuj i dołącz</p>
        <h3>Jeden kod na całą sesję.</h3>
        <p className="muted">Bez konta. Głosujesz na swoim telefonie.</p>
        <button
          className="secondary small"
          onClick={() =>
            void navigator.clipboard
              .writeText(url)
              .then(() => setCopied(true))
              .catch(() => window.prompt("Skopiuj adres sesji:", url))
          }
        >
          {copied ? "Skopiowano link" : "Kopiuj link"}
        </button>
        <a className="tiny-link" href={url} target="_blank" rel="noreferrer">
          Otwórz widok uczestnika ↗
        </a>
      </div>
    </section>
  );
}
function Home() {
  const [presentations, setPresentations] = useState<PublishedPresentation[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    void api<PublishedPresentation[]>("/api/presentations")
      .then(setPresentations)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);
  return (
    <Shell>
      <section className="home-hero">
        <p className="eyebrow">Ludzie · Technologia · Leadership</p>
        <h1>
          Lepsze rozmowy.
          <br />
          <em>Silniejsze zespoły.</em>
        </h1>
        <p className="lead">
          Dobry kod potrzebuje dobrego zespołu. A zespół — zaufania, szczerej
          informacji zwrotnej i odwagi do trudnych rozmów.
        </p>
        <p className="home-intro">
          Jestem Marcin Kołodziej. Mówię o ludzkiej stronie prowadzenia zespołów
          inżynierskich — równie ważnej jak decyzje techniczne. Bliskie jest mi
          podejście Kim Scott: troska o drugą osobę i mówienie wprost mogą iść w
          parze.
        </p>
        <a
          className="button secondary"
          href="https://www.youtube.com/@codestorybro"
          target="_blank"
          rel="noreferrer"
        >
          Rozmowy na YouTube ↗
        </a>
      </section>
      <section className="public-library" aria-labelledby="library-heading">
        <p className="eyebrow">Materiały z wystąpień</p>
        <h2 id="library-heading">Zabierz tę rozmowę do swojego zespołu.</h2>
        <p className="muted">
          Prezentacje do pobrania — ze slajdami, pytaniami do przemyślenia i
          wynikami wspólnego głosowania.
        </p>
        <Notice>{error}</Notice>
        {loading ? (
          <p role="status">Wczytuję prezentacje…</p>
        ) : !error && !presentations.length ? (
          <p className="library-empty">
            Pierwsze materiały pojawią się tutaj po wystąpieniu. Wróć po
            prezentację i pytania, do których warto wrócić z zespołem.
          </p>
        ) : (
          presentations.map((item) => (
            <article key={item.id} className="public-presentation">
              <div>
                <p className="eyebrow">PDF · {item.pages} stron</p>
                <h3>{item.title}</h3>
              </div>
              <a
                className="button secondary"
                href={`/api/presentations/${item.id}/pdf`}
                download
              >
                Pobierz PDF ↓<span className="sr-only"> — {item.title}</span>
              </a>
            </article>
          ))
        )}
      </section>
      <div className="studio-entry">
        <a href="/presenter">Panel prezentera ↗</a>
      </div>
    </Shell>
  );
}

function Participant({ id }: { id: string }) {
  const { state, connected, error, pending, vote } = useLive(id, "participant");
  return (
    <Shell>
      <div className="participant">
        <Status connected={connected} />
        <Notice>{error}</Notice>
        {!state ? (
          <section className="waiting">
            <span className="orb">↗</span>
            <h1>Dołączanie do sesji</h1>
            <p className="muted">Za chwilę zobaczysz pytanie prezentera.</p>
          </section>
        ) : (
          <>
            <p className="eyebrow session-label">{state.title}</p>
            {state.active ? (
              <section>
                <p className="eyebrow">Głosowanie otwarte</p>
                <h1 className="question-title">{state.active.text}</h1>
                <p className="muted">
                  Możesz zmienić zdanie do zamknięcia pytania.
                </p>
                <div className="choices">
                  {(["A", "B"] as const).map((choice) => (
                    <button
                      key={choice}
                      className={`choice ${state.vote?.choice === choice ? "selected" : ""}`}
                      disabled={!connected || pending !== null}
                      aria-pressed={state.vote?.choice === choice}
                      onClick={() => vote(choice)}
                    >
                      <span className="choice-letter">{choice}</span>
                      <span>
                        {choice === "A" ? state.active!.a : state.active!.b}
                      </span>
                      <span className="choice-check">
                        {state.vote?.choice === choice ? "✓" : "↗"}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="vote-status" role="status">
                  {pending
                    ? `Zapisuję odpowiedź ${pending}…`
                    : state.vote
                      ? `✓ Przyjęto odpowiedź ${state.vote.choice}`
                      : "Wybierz odpowiedź powyżej."}
                </p>
              </section>
            ) : (
              <section className="waiting">
                <span className="orb">
                  {state.status === "ended" ? "✓" : "…"}
                </span>
                <h1>
                  {state.status === "ended"
                    ? "Dzięki za udział."
                    : state.lastClosed
                      ? "Głosowanie zamknięte."
                      : "Jesteś na miejscu."}
                </h1>
                <p className="muted">
                  {state.status === "ended"
                    ? "Sesja została zakończona."
                    : "Pozostań na tej stronie. Kolejne pytanie pojawi się automatycznie."}
                </p>
                {state.lastClosed && (
                  <div className="closed-results">
                    <p className="eyebrow">Wynik ostatniego pytania</p>
                    <h2>{state.lastClosed.text}</h2>
                    <Results
                      result={state.lastClosed.result}
                      a={state.lastClosed.a}
                      b={state.lastClosed.b}
                    />
                  </div>
                )}
              </section>
            )}
          </>
        )}
      </div>
    </Shell>
  );
}
function Dashboard() {
  const [deleting, setDeleting] = useState<string | null>(null);
  const [sessions, setSessions] = useState<Summary[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [local, setLocal] = useState(false);
  const [busy, setBusy] = useState(false);
  const [title, setTitle] = useState("");
  useEffect(() => {
    void Promise.all([
      api<Summary[]>("/api/presenter/sessions"),
      api<{ local: boolean }>("/api/presenter/me"),
    ])
      .then(([data, me]) => {
        setSessions(data);
        setLocal(me.local);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);
  async function removeSession(session: Summary) {
    if (
      !window.confirm(
        `Usunąć sesję „${session.title}” razem z PDF-em, pytaniami i wszystkimi wynikami? Tej operacji nie można cofnąć.`,
      )
    )
      return;
    setDeleting(session.id);
    setError("");
    try {
      await api(`/api/presenter/sessions/${session.id}`, { method: "DELETE" });
      setSessions((items) => items.filter((item) => item.id !== session.id));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setDeleting(null);
    }
  }
  async function create(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const s = await api<Summary>("/api/presenter/sessions", {
        method: "POST",
        body: JSON.stringify({ title, questions: [] }),
      });
      location.href = `/presenter/${s.id}`;
    } catch (e) {
      setError((e as Error).message);
      setBusy(false);
    }
  }
  return (
    <Shell badge="STUDIO">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Panel prezentera</p>
          <h1>
            Twoja następna
            <br />
            <em>dobra rozmowa.</em>
          </h1>
        </div>
        <span className="private-badge">↗ Prywatne archiwum</span>
      </div>
      {local && (
        <p className="local-banner">
          Tryb lokalny · dostęp prezentera bez logowania tylko na tym
          komputerze.
        </p>
      )}
      <Notice>{error}</Notice>
      <form className="create-form" onSubmit={create}>
        <label htmlFor="session-title">Nowa sesja</label>
        <div>
          <input
            id="session-title"
            placeholder="Np. Architektura to sztuka wyboru"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={160}
            required
          />
          <button disabled={busy || loading || !title.trim()}>
            {busy ? "Tworzę…" : "Utwórz sesję +"}{" "}
          </button>
        </div>
      </form>
      <section>
        <div className="section-heading">
          <h2>Sesje i archiwum</h2>
          <span className="muted">{sessions.length} / 100 sesji</span>
        </div>
        {loading ? (
          <p>Wczytywanie…</p>
        ) : !sessions.length ? (
          <div className="empty">
            <h3>Tu zaczyna się pierwsze wystąpienie.</h3>
            <p>Utwórz sesję, dodaj PDF i przygotuj pytania A/B.</p>
          </div>
        ) : (
          <div className="session-list">
            {sessions.map((s) => (
              <div key={s.id} className="session-row">
                <a href={`/presenter/${s.id}`} className="session-link">
                  <div>
                    <span className={`pill ${s.status}`}>
                      {statusLabel(s.status)}
                    </span>
                    <h3>{s.title}</h3>
                    <p>
                      {s.createdAt
                        ? `${new Date(s.createdAt).toLocaleDateString("pl-PL")} · `
                        : ""}
                      {s.questions} pytań ·{" "}
                      {s.status === "ended"
                        ? `${s.totalParticipants} uczestników łącznie`
                        : `${s.participants} online`}
                    </p>
                  </div>
                  <span className="arrow">↗</span>
                </a>
                <button
                  className="secondary small"
                  disabled={s.status === "live" || deleting !== null}
                  title={
                    s.status === "live"
                      ? "Zakończ sesję przed usunięciem"
                      : "Usuń sesję wraz z PDF-em i wynikami"
                  }
                  onClick={() => void removeSession(s)}
                >
                  {deleting === s.id
                    ? "Usuwanie…"
                    : s.deleting
                      ? "Dokończ usuwanie"
                      : "Usuń sesję"}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </Shell>
  );
}
const statusLabel = (s: string) =>
  s === "draft" ? "Szkic" : s === "live" ? "Na żywo" : "Archiwum";
function Editor({
  state,
  refresh,
  onError,
}: {
  state: Snapshot;
  refresh: () => Promise<void>;
  onError: (message: string) => void;
}) {
  const [title, setTitle] = useState(state.title);
  const [questions, setQuestions] = useState<Question[]>(state.questions ?? []);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const base = `/api/presenter/sessions/${state.id}`;
  const change = (
    id: string,
    field: keyof Question,
    value: string | number,
  ) => {
    setSaved(false);
    setQuestions((qs) =>
      qs.map((q) => (q.id === id ? { ...q, [field]: value } : q)),
    );
  };
  async function save(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    onError("");
    try {
      await api(base, {
        method: "PUT",
        body: JSON.stringify({ title, questions }),
      });
      await refresh();
      setSaved(true);
    } catch (e) {
      onError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function upload(file?: File) {
    if (!file) return;
    setBusy(true);
    onError("");
    try {
      if (file.size > 50_000_000)
        throw new Error("PDF może mieć maksymalnie 50 MB.");
      const { inspectPdf } = await import("./Pdf");
      const pages = await inspectPdf(file);
      await api(`${base}/pdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/pdf",
          "X-Pdf-Pages": String(pages),
          "X-Pdf-Name": encodeURIComponent(file.name),
        },
        body: file,
      });
      await refresh();
    } catch (e) {
      onError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="setup">
      <section className="panel">
        <p className="eyebrow">01 / Prezentacja</p>
        <h2>Dodaj slajdy w PDF.</h2>
        <p className="muted">
          Plik jest prywatny. Uczestnicy widzą tylko pytania i wyniki.
        </p>
        {state.pdfName ? (
          <div className="file-card">
            <span>PDF</span>
            <div>
              <strong>{state.pdfName}</strong>
              <p>{state.pageCount} slajdów</p>
            </div>
            <button
              className="secondary small"
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                try {
                  await api(`${base}/pdf`, { method: "DELETE" });
                  await refresh();
                } catch (e) {
                  onError((e as Error).message);
                } finally {
                  setBusy(false);
                }
              }}
            >
              Usuń
            </button>
          </div>
        ) : (
          <label className="upload">
            {busy ? "Przetwarzanie…" : "↑ Wybierz PDF"}
            <input
              aria-label="Dodaj PDF"
              type="file"
              accept="application/pdf,.pdf"
              disabled={busy}
              onChange={(e) => void upload(e.target.files?.[0])}
            />
            <small>Do 50 MB · maksymalnie 2000 slajdów</small>
          </label>
        )}
      </section>
      <form className="panel" onSubmit={save}>
        <p className="eyebrow">02 / Pytania</p>
        <h2>Zaplanuj moment wyboru.</h2>
        <p className="muted">
          Pytanie pojawi się automatycznie, gdy przejdziesz dalej po wybranym
          slajdzie.
        </p>
        <label className="field">
          Tytuł sesji
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSaved(false);
            }}
            maxLength={160}
            required
          />
        </label>
        {questions.map((q, index) => (
          <fieldset className="question-editor" key={q.id}>
            <legend>Pytanie {index + 1}</legend>
            <div className="question-meta">
              <label className="field">
                Po slajdzie
                <input
                  type="number"
                  min="1"
                  max={state.pageCount || 2000}
                  value={q.slide}
                  required
                  onChange={(e) =>
                    change(q.id, "slide", Number(e.target.value))
                  }
                />
              </label>
              <button
                type="button"
                className="text-button"
                onClick={() => {
                  setQuestions((qs) => qs.filter((row) => row.id !== q.id));
                  setSaved(false);
                }}
              >
                Usuń pytanie
              </button>
            </div>
            <label className="field">
              Treść pytania
              <textarea
                rows={2}
                value={q.text}
                maxLength={500}
                required
                onChange={(e) => change(q.id, "text", e.target.value)}
              />
            </label>
            <div className="answer-fields">
              <label className="field">
                A
                <input
                  value={q.a}
                  maxLength={160}
                  required
                  onChange={(e) => change(q.id, "a", e.target.value)}
                />
              </label>
              <label className="field">
                B
                <input
                  value={q.b}
                  maxLength={160}
                  required
                  onChange={(e) => change(q.id, "b", e.target.value)}
                />
              </label>
            </div>
          </fieldset>
        ))}
        <div className="actions">
          <button
            type="button"
            className="secondary"
            disabled={questions.length >= 100 || busy}
            onClick={() => {
              setQuestions((qs) => [
                ...qs,
                { id: crypto.randomUUID(), slide: 1, text: "", a: "", b: "" },
              ]);
              setSaved(false);
            }}
          >
            + Dodaj pytanie
          </button>
          <button disabled={busy}>
            {busy ? "Zapisuję…" : saved ? "✓ Zapisano" : "Zapisz pytania"}
          </button>
        </div>
        <p className="muted small-text">
          Przed rozpoczęciem zapisz zmiany. Sesja korzysta wyłącznie z
          zapisanych pytań.
        </p>
      </form>
    </div>
  );
}
function Publication({
  state,
  base,
  onUpdate,
}: {
  state: Snapshot;
  base: string;
  onUpdate: (next: Snapshot) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  async function share() {
    setBusy(true);
    setError("");
    try {
      const { createPublication } = await import("./publication");
      const pdf = await createPublication(state, base, setProgress);
      setProgress("Udostępniam prezentację…");
      onUpdate(
        await api<Snapshot>(`${base}/publication`, {
          method: "POST",
          headers: { "Content-Type": "application/pdf" },
          body: pdf,
        }),
      );
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
      setProgress("");
    }
  }
  async function withdraw() {
    setBusy(true);
    setError("");
    try {
      onUpdate(
        await api<Snapshot>(`${base}/publication`, { method: "DELETE" }),
      );
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <section
      className="publication-panel panel"
      aria-label="Udostępnianie prezentacji"
    >
      <p className="eyebrow">
        {state.publishedAt
          ? "Udostępniona publicznie"
          : "Tylko w Twoim archiwum"}
      </p>
      <h3>Prezentacja do pobrania</h3>
      <p className="muted">
        Udostępnij na stronie głównej Live PDF ze slajdami i pytaniami. Wyniki
        pokażą procenty z ostatniej rundy, bez liczby głosów i danych
        uczestników.
      </p>
      <Notice>{error}</Notice>
      {state.publishedAt ? (
        <div className="actions">
          <a
            className="button secondary"
            href={`/api/presentations/${state.id}/pdf`}
            download
          >
            Pobierz udostępniony PDF ↓
          </a>
          <button
            className="secondary"
            disabled={busy}
            onClick={() => void withdraw()}
          >
            Wycofaj udostępnienie
          </button>
        </div>
      ) : (
        <button disabled={busy || !state.pdfName} onClick={() => void share()}>
          {busy ? "Przygotowuję…" : "Udostępnij"}
        </button>
      )}
      {progress && (
        <p role="status" className="muted">
          {progress}
        </p>
      )}
    </section>
  );
}
function Presenter({
  id,
  projector = false,
}: {
  id: string;
  projector?: boolean;
}) {
  const live = useLive(id, "presenter");
  const { state, connected } = live;
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const commandPending = useRef(false);
  const [confirmEnd, setConfirmEnd] = useState(false);
  const base = `/api/presenter/sessions/${id}`;
  const refresh = async () => live.apply(await api<Snapshot>(base));
  async function command(cmd: Command) {
    if (commandPending.current) return;
    commandPending.current = true;
    setBusy(true);
    setError("");
    try {
      live.apply(
        await api<Snapshot>(`${base}/commands`, {
          method: "POST",
          body: JSON.stringify(cmd),
        }),
      );
    } catch (e) {
      setError((e as Error).message);
    } finally {
      commandPending.current = false;
      setBusy(false);
    }
  }
  function navigate(direction: 1 | -1) {
    if (!state || !connected || busy || state.status !== "live") return;
    void command({
      type: "navigate",
      direction,
      navigationVersion: state.navigationVersion,
    });
  }
  useEffect(() => {
    if (!projector) return;
    const key = (event: KeyboardEvent) => {
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.isComposing ||
        (event.target instanceof Element &&
          event.target.closest(
            "input, textarea, select, [contenteditable='true']",
          ))
      )
        return;
      const next = [
        "ArrowRight",
        "ArrowDown",
        "PageDown",
        " ",
        "n",
        "N",
      ].includes(event.key);
      const previous = [
        "ArrowLeft",
        "ArrowUp",
        "PageUp",
        "Backspace",
        "p",
        "P",
      ].includes(event.key);
      const fullscreen = ["f", "F", "F5"].includes(event.key);
      if (!next && !previous && !fullscreen) return;
      event.preventDefault();
      if (event.repeat) return;
      if (fullscreen)
        void document.documentElement.requestFullscreen().catch(() => {});
      else if (state) navigate(next ? 1 : -1);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [projector, state, connected, busy]);
  if (!state)
    return (
      <Shell>
        <Notice>{live.error}</Notice>
        <p>Wczytywanie sesji…</p>
      </Shell>
    );
  const steps = presentationSteps(state.pageCount, state.questions ?? []);
  const position = steps.findIndex(
    (step) =>
      step.slide === state.slide && step.questionId === state.displayQuestionId,
  );
  const canPrevious = position > 0;
  const canNext =
    position < steps.length - 1 ||
    (!!state.active && state.active.id === state.displayQuestionId);
  const question = state.active ?? state.lastClosed;
  const result = question ? state.results?.[question.id] : undefined;
  const projectedQuestion =
    state.questions?.find((q) => q.id === state.displayQuestionId) ?? null;
  const projectedResult = projectedQuestion
    ? state.results?.[projectedQuestion.id]
    : undefined;
  const questionPreview = projectedQuestion ? (
    <section className="projector-question">
      {state.active?.id !== projectedQuestion.id && (
        <p className="eyebrow">Tak zagłosowała sala</p>
      )}
      <h1>{projectedQuestion.text}</h1>
      {projectedResult && (
        <Results
          result={projectedResult}
          a={projectedQuestion.a}
          b={projectedQuestion.b}
        />
      )}
    </section>
  ) : null;
  if (projector)
    return (
      <div
        className={`projector ${state.status === "live" && !projectedQuestion ? "showing-slide" : ""}`}
      >
        <div className="projector-bar">
          <a className="brand" href={`/presenter/${id}`}>
            CodeStoryBro<span className="live-tag">LIVE</span>
          </a>
          <Status connected={connected} />
          <button
            className="secondary small"
            onClick={() =>
              void document.documentElement.requestFullscreen().catch(() => {})
            }
          >
            Pełny ekran
          </button>
        </div>
        <Notice>{error || live.error}</Notice>
        {state.status === "draft" ? (
          <section className="projector-join">
            <p className="eyebrow">Za chwilę zaczynamy</p>
            <h1>{state.title}</h1>
            <QR id={id} />
          </section>
        ) : projectedQuestion ? (
          questionPreview
        ) : state.pdfName ? (
          <Pdf url={`${base}/pdf`} page={state.slide} />
        ) : (
          <div className="waiting">
            <h1>{state.title}</h1>
            <p>
              {state.status === "ended"
                ? "Dziękuję za udział."
                : "Za chwilę zaczynamy."}
            </p>
          </div>
        )}
        <div className="projector-bottom">
          {projectedQuestion && <QR id={id} compact />}
          {state.status === "live" && (
            <nav className="actions" aria-label="Sterowanie prezentacją">
              <button
                className="secondary"
                aria-label="Poprzedni slajd"
                title="Poprzedni slajd (← / Page Up)"
                disabled={busy || !connected || !canPrevious}
                onClick={() => navigate(-1)}
              >
                ←
              </button>
              <button
                className="secondary"
                aria-label="Następny slajd"
                title="Następny slajd (→ / Page Down / spacja)"
                disabled={busy || !connected || !canNext}
                onClick={() => navigate(1)}
              >
                →
              </button>
            </nav>
          )}
        </div>
      </div>
    );
  return (
    <Shell badge="STUDIO">
      <a className="back" href="/presenter">
        ← Sesje i archiwum
      </a>
      <div className="session-heading">
        <div>
          <span className={`pill ${state.status}`}>
            {statusLabel(state.status)}
          </span>
          <h1>{state.title}</h1>
          <Status connected={connected} />
        </div>
        <div className="session-count">
          <strong>
            {state.participants}
            <small>/200</small>
          </strong>
          <span>uczestników online</span>
        </div>
      </div>
      <Notice>{error || live.error}</Notice>
      <div className="session-actions">
        <a
          className="button secondary"
          href={`/presenter/${id}/screen`}
          target="_blank"
          rel="noreferrer"
        >
          Otwórz ekran projektora ↗
        </a>
        <a className="button secondary" href={`${base}/export`}>
          Eksport CSV ↓
        </a>
        {state.status === "draft" && (
          <button
            disabled={busy || !connected || !state.pdfName}
            onClick={() => void command({ type: "start" })}
          >
            Rozpocznij sesję →
          </button>
        )}
        {state.status === "live" &&
          (confirmEnd ? (
            <>
              <span>Zakończyć sesję i zamknąć głosowanie?</span>
              <button
                className="danger"
                disabled={busy}
                onClick={() => {
                  setConfirmEnd(false);
                  void command({ type: "end" });
                }}
              >
                Tak, zakończ
              </button>
              <button
                className="secondary"
                onClick={() => setConfirmEnd(false)}
              >
                Anuluj
              </button>
            </>
          ) : (
            <button className="secondary" onClick={() => setConfirmEnd(true)}>
              Zakończ sesję
            </button>
          ))}
      </div>
      {state.status === "draft" ? (
        <>
          <Editor state={state} refresh={refresh} onError={setError} />
          <QR id={id} />
        </>
      ) : state.status === "live" ? (
        <div className="live-grid">
          <section>
            <div className="slide-toolbar">
              <h2>Prezentacja</h2>
              <div className="actions">
                <button
                  aria-label="Poprzedni slajd"
                  className="secondary small"
                  disabled={busy || !connected || !canPrevious}
                  onClick={() => navigate(-1)}
                >
                  ←
                </button>
                <button
                  aria-label="Następny slajd"
                  className="secondary small"
                  disabled={busy || !connected || !canNext}
                  onClick={() => navigate(1)}
                >
                  →
                </button>
              </div>
            </div>
            <div className="presenter-preview">
              {projectedQuestion ? (
                questionPreview
              ) : state.pdfName ? (
                <Pdf url={`${base}/pdf`} page={state.slide} />
              ) : null}
              {projectedQuestion && <QR id={id} compact />}
            </div>
          </section>
          <aside>
            {state.active && (
              <section className="panel active-panel">
                <p className="eyebrow">Głosowanie otwarte</p>
                <h2>{state.active.text}</h2>
                {result && (
                  <Results
                    showCounts
                    result={result}
                    a={state.active.a}
                    b={state.active.b}
                  />
                )}
                <button
                  className="wide"
                  disabled={busy || !connected}
                  onClick={() => void command({ type: "close" })}
                >
                  Zamknij pytanie
                </button>
              </section>
            )}
            <div className="question-list">
              {state.questions?.map((q) => (
                <div
                  key={q.id}
                  className={`question-item ${q.slide === state.slide ? "current" : ""}`}
                >
                  <p className="eyebrow">
                    Po slajdzie {q.slide}{" "}
                    {q.slide === state.slide ? "· teraz" : ""}
                  </p>
                  <h3>{q.text}</h3>
                  {(state.closedIds?.includes(q.id) ||
                    state.active?.id === q.id) && (
                    <button
                      className="secondary small"
                      disabled={
                        busy || !connected || state.displayQuestionId === q.id
                      }
                      onClick={() =>
                        void command({
                          type: "show-question",
                          questionId: q.id,
                        })
                      }
                    >
                      Pokaż pytanie na ekranie
                    </button>
                  )}
                  <button
                    className="secondary small"
                    disabled={busy || !connected || !!state.active}
                    onClick={() =>
                      void command({ type: "open", questionId: q.id })
                    }
                  >
                    {state.closedIds?.includes(q.id)
                      ? "Uruchom ponownie od zera ↻"
                      : state.active?.id === q.id
                        ? "Otwarte"
                        : "Otwórz pytanie →"}
                  </button>
                </div>
              ))}
            </div>
          </aside>
        </div>
      ) : (
        <section>
          <p className="eyebrow">Archiwum sesji</p>
          <Publication state={state} base={base} onUpdate={live.apply} />
          <h2>Tak zagłosowała sala.</h2>
          {state.questions?.map((q) => (
            <article key={q.id} className="archive-question">
              <p className="eyebrow">
                Slajd {q.slide} ·{" "}
                {state.closedIds?.includes(q.id)
                  ? "Zamknięte"
                  : "Nieuruchomione"}
              </p>
              <h3>{q.text}</h3>
              <p className="eyebrow">
                Runda {(state.history?.[q.id]?.length ?? 0) + 1}
              </p>
              <Results
                showCounts
                result={state.results![q.id]}
                a={q.a}
                b={q.b}
              />
              {state.history?.[q.id]?.map((previous) => (
                <details key={previous.round}>
                  <summary>Poprzednia runda {previous.round}</summary>
                  <Results
                    showCounts
                    result={previous.result}
                    a={q.a}
                    b={q.b}
                  />
                </details>
              ))}
            </article>
          ))}
          {state.pdfName && (
            <div className="file-card">
              <span>PDF</span>
              <strong>{state.pdfName}</strong>
              <a
                href={`${base}/pdf`}
                className="button secondary small"
                target="_blank"
                rel="noreferrer"
              >
                Otwórz PDF ↗
              </a>
              <button
                className="text-button"
                disabled={!!state.publishedAt}
                title={
                  state.publishedAt
                    ? "Najpierw wycofaj udostępnienie"
                    : undefined
                }
                onClick={async () => {
                  if (
                    !window.confirm(
                      "Usunąć PDF z archiwum? Wyniki pozostaną zapisane.",
                    )
                  )
                    return;
                  try {
                    await api(`${base}/pdf`, { method: "DELETE" });
                    await refresh();
                  } catch (e) {
                    setError((e as Error).message);
                  }
                }}
              >
                Usuń PDF
              </button>
            </div>
          )}
        </section>
      )}
    </Shell>
  );
}
function App() {
  const path = location.pathname;
  if (path === "/") return <Home />;
  if (path === "/presenter" || path === "/presenter/") return <Dashboard />;
  const admin = path.match(/^\/presenter\/([a-f0-9-]{36})(\/screen)?\/?$/);
  if (admin) return <Presenter id={admin[1]} projector={!!admin[2]} />;
  const participant = path.match(/^\/s\/([a-f0-9-]{36})\/?$/);
  if (participant) return <Participant id={participant[1]} />;
  return (
    <Shell>
      <h1>Nie ma takiej strony.</h1>
      <p>Otwórz adres z kodu QR prezentera.</p>
      <a href="/">Wróć na początek</a>
    </Shell>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
