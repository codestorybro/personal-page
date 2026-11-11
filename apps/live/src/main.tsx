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
import { Header, useAppLinks } from "../../../packages/ui/Header";
import { LocaleProvider, useLocale } from "../../../packages/ui/Locale";
import "../../../packages/ui/header.css";
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
import { LIMITS, percentages, presentationSteps } from "../shared/protocol";
import { api, useLive } from "./api";
const LazyPdf = lazy(() =>
  import("./Pdf").then((module) => ({ default: module.Pdf })),
);
function Pdf(props: { url: string; page: number }) {
  const { t } = useLocale();
  return (
    <Suspense fallback={<p>{t("Wczytywanie odtwarzacza PDF…")}</p>}>
      <LazyPdf {...props} />
    </Suspense>
  );
}
import "./style.css";
import "../../../packages/ui/interaction.css";

function Shell({
  children,
  badge = "Live",
}: {
  children: ReactNode;
  badge?: "Stage" | "Studio" | "Live";
}) {
  const { home } = useAppLinks(undefined, import.meta.env.VITE_HOME_URL);
  return (
    <>
      <Header variant={badge} brandUrl={home} stageUrl="/" className="topbar" />
      <main>{children}</main>
      <Footer />
    </>
  );
}
function Notice({ children }: { children: ReactNode }) {
  const { t } = useLocale();
  return children ? (
    <p className="notice" role="alert">
      {typeof children === "string" ? t(children) : children}
    </p>
  ) : null;
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
  const { t } = useLocale();
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
          {counts.total} {counts.total === 1 ? t("głos") : t("głosów")}
        </p>
      )}
    </div>
  );
}
function QR({ id, compact = false }: { id: string; compact?: boolean }) {
  const { t } = useLocale();
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
            alt={t("Kod QR dołączenia do tej sesji")}
            width="180"
            height="180"
          />
        )}
      </div>
      <div>
        <p className="eyebrow">{t("Zeskanuj i dołącz")}</p>
        <h3>{t("Jeden kod na całą sesję.")}</h3>
        <p className="muted">{t("Bez konta. Głosujesz na swoim telefonie.")}</p>
        <button
          className="secondary small"
          onClick={() =>
            void navigator.clipboard
              .writeText(url)
              .then(() => setCopied(true))
              .catch(() => window.prompt(t("Skopiuj adres sesji:"), url))
          }
        >
          {copied ? t("Skopiowano link") : t("Kopiuj link")}
        </button>
        <a className="tiny-link" href={url} target="_blank" rel="noreferrer">
          {t("Otwórz widok uczestnika ↗")}{" "}
        </a>
      </div>
    </section>
  );
}
function Home() {
  const { t } = useLocale();
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
    <Shell badge="Stage">
      <section className="home-hero">
        <p className="eyebrow">{t("Ludzie · Technologia · Leadership")}</p>
        <h1>
          {t("Materiały")} <br />
          <em>{t("z wystąpień.")}</em>
        </h1>
        <p className="lead">
          {t("Technologia to ludzie. Dobry produkt potrzebuje dobrego zespołu.")}{" "}
        </p>
        <p className="home-intro">
          {t(
            "Żeby wymagać od zespołu, najpierw trzeba zadbać o podstawy: jasny cel, warunki do pracy i wsparcie. Na dłuższą metę samo stawianie wymagań nie wystarcza.",
          )}{" "}
        </p>
        <a
          className="button secondary"
          href="https://www.youtube.com/@codestorybro"
          target="_blank"
          rel="noreferrer"
        >
          {t("YouTube ↗")}{" "}
        </a>
      </section>
      <section className="public-library" aria-labelledby="library-heading">
        <p className="eyebrow">{t("Materiały z wystąpień")}</p>
        <h2 id="library-heading">
          {t("Zabierz idee z moich wystąpień do swojego zespołu.")}
        </h2>
        <p className="muted">{t("Prezentacje do pobrania")} </p>
        <Notice>{error}</Notice>
        {loading ? (
          <p role="status">{t("Wczytuję prezentacje…")}</p>
        ) : !error && !presentations.length ? (
          <p className="library-empty">
            {t(
              "Materiały pojawią się tutaj po pierwszym udostępnionym wystąpieniu.",
            )}{" "}
          </p>
        ) : (
          presentations.map((item) => (
            <article key={item.id} className="public-presentation">
              <div>
                <h3>{item.title}</h3>
              </div>
              <a
                className="button secondary"
                href={`/api/presentations/${item.id}/pdf`}
                download
              >
                {t("Pobierz PDF ↓")}
                <span className="sr-only">: {item.title}</span>
              </a>
            </article>
          ))
        )}
      </section>
    </Shell>
  );
}

function Participant({ id }: { id: string }) {
  const { t } = useLocale();
  const { state, connected, error, pending, vote } = useLive(id, "participant");
  return (
    <Shell>
      <div className="participant">
        <Notice>{error}</Notice>
        {!state ? (
          <section className="waiting">
            <span className="orb">↗</span>
            <h1>{t("Dołączanie do sesji")}</h1>
            <p className="muted">
              {t("Za chwilę zobaczysz pytanie prezentera.")}
            </p>
          </section>
        ) : (
          <>
            <p className="eyebrow session-label">{state.title}</p>
            {state.active ? (
              <section>
                <p className="eyebrow">{t("Głosowanie otwarte")}</p>
                <h1 className="question-title">{state.active.text}</h1>
                <p className="muted">
                  {t("Możesz zmienić zdanie do zamknięcia pytania.")}{" "}
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
                    ? t(`Zapisuję odpowiedź ${pending}…`)
                    : state.vote
                      ? t(`✓ Przyjęto odpowiedź ${state.vote.choice}`)
                      : t("Wybierz odpowiedź powyżej.")}
                </p>
              </section>
            ) : (
              <section className="waiting">
                <span className="orb">
                  {state.status === "ended" ? "✓" : "…"}
                </span>
                <h1>
                  {state.status === "ended"
                    ? t("Dzięki za udział.")
                    : state.lastClosed
                      ? t("Głosowanie zamknięte.")
                      : t("Jesteś na miejscu.")}
                </h1>
                <p className="muted">
                  {state.status === "ended"
                    ? t("Sesja została zakończona.")
                    : t(
                        "Pozostań na tej stronie. Kolejne pytanie pojawi się automatycznie.",
                      )}
                </p>
                {state.lastClosed && (
                  <div className="closed-results">
                    <p className="eyebrow">{t("Wynik ostatniego pytania")}</p>
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
  const { t, locale } = useLocale();
  const [deleting, setDeleting] = useState<string | null>(null);
  const [sessions, setSessions] = useState<Summary[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [title, setTitle] = useState("");
  useEffect(() => {
    void api<Summary[]>("/api/presenter/sessions")
      .then(setSessions)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);
  async function removeSession(session: Summary) {
    if (
      !window.confirm(
        t(
          `Usunąć sesję „${session.title}” razem z PDF-em, pytaniami i wszystkimi wynikami? Tej operacji nie można cofnąć.`,
        ),
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
    <Shell badge="Studio">
      <div className="page-heading">
        <h1>{t("Sesje prezentacji")}</h1>
      </div>
      <Notice>{error}</Notice>
      <form className="create-form" onSubmit={create}>
        <label htmlFor="session-title">{t("Nowa sesja")}</label>
        <div>
          <input
            id="session-title"
            placeholder={t("Np. Architektura to sztuka wyboru")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={160}
            required
          />
          <button disabled={busy || loading || !title.trim()}>
            {busy ? t("Tworzę…") : t("Utwórz sesję +")}{" "}
          </button>
        </div>
      </form>
      <section>
        <div className="section-heading">
          <h2>{t("Sesje i archiwum")}</h2>
          <span className="muted">
            {sessions.length} {t("/ 100 sesji")}
          </span>
        </div>
        {loading ? (
          <p>{t("Wczytywanie…")}</p>
        ) : !sessions.length ? (
          <div className="empty">
            <h3>{t("Brak sesji.")}</h3>
            <p>{t("Utwórz sesję, dodaj PDF i przygotuj pytania A/B.")}</p>
          </div>
        ) : (
          <div className="session-list">
            {sessions.map((s) => (
              <div key={s.id} className="session-row">
                <a href={`/presenter/${s.id}`} className="session-link">
                  <div>
                    <span className={`pill ${s.status}`}>
                      {t(statusLabel(s.status))}
                    </span>
                    <h3>{s.title}</h3>
                    <p>
                      {s.createdAt
                        ? `${new Date(s.createdAt).toLocaleDateString(locale === "pl" ? "pl-PL" : "en-GB")} · `
                        : ""}
                      {s.questions} {t("pytań ·")}{" "}
                      {s.status === "ended"
                        ? t(`${s.totalParticipants} uczestników łącznie`)
                        : `${s.participants} online`}
                    </p>
                    <p className="peak-summary">
                      {t("Szczyt uczestników podczas głosowania")}:{" "}
                      {s.peakParticipants ?? t("Brak historycznego pomiaru")}
                    </p>
                  </div>
                  <span className="arrow">↗</span>
                </a>
                <button
                  className="secondary small"
                  disabled={s.status === "live" || deleting !== null}
                  title={
                    s.status === "live"
                      ? t("Zakończ sesję przed usunięciem")
                      : t("Usuń sesję wraz z PDF-em i wynikami")
                  }
                  onClick={() => void removeSession(s)}
                >
                  {deleting === s.id
                    ? t("Usuwanie…")
                    : s.deleting
                      ? t("Dokończ usuwanie")
                      : t("Usuń sesję")}
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
  const { t } = useLocale();
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
      if (file.size > LIMITS.pdfBytes)
        throw new Error("PDF może mieć maksymalnie 20 MB.");
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
        <p className="eyebrow">{t("01 / Prezentacja")}</p>
        <h2>{t("Dodaj slajdy w PDF.")}</h2>
        <p className="muted">
          {t("Plik jest prywatny. Uczestnicy widzą tylko pytania i wyniki.")}{" "}
        </p>
        {state.pdfName ? (
          <div className="file-card">
            <span>PDF</span>
            <div>
              <strong>{state.pdfName}</strong>
              <p>
                {state.pageCount} {t("slajdów")}
              </p>
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
              {t("Usuń")}{" "}
            </button>
          </div>
        ) : (
          <label className="upload">
            {busy ? t("Przetwarzanie…") : t("↑ Wybierz PDF")}
            <input
              aria-label={t("Dodaj PDF")}
              type="file"
              accept="application/pdf,.pdf"
              disabled={busy}
              onChange={(e) => void upload(e.target.files?.[0])}
            />
            <small>{t("Do 20 MB · maksymalnie 2000 slajdów")}</small>
          </label>
        )}
      </section>
      <form className="panel" onSubmit={save}>
        <p className="eyebrow">{t("02 / Pytania")}</p>
        <h2>{t("Pytania A/B")}</h2>
        <p className="muted">{t("Do 5 pytań na sesję.")}</p>
        <p className="muted">
          {t(
            "Pytanie pojawi się automatycznie, gdy przejdziesz dalej po wybranym slajdzie.",
          )}{" "}
        </p>
        <label className="field">
          {t("Tytuł sesji")}{" "}
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
            <legend>
              {t("Pytanie")} {index + 1}
            </legend>
            <div className="question-meta">
              <label className="field">
                {t("Po slajdzie")}{" "}
                <input
                  type="number"
                  min="1"
                  max={state.pageCount || LIMITS.slides}
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
                {t("Usuń pytanie")}{" "}
              </button>
            </div>
            <label className="field">
              {t("Treść pytania")}{" "}
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
            disabled={questions.length >= LIMITS.questions || busy}
            onClick={() => {
              setQuestions((qs) => [
                ...qs,
                { id: crypto.randomUUID(), slide: 1, text: "", a: "", b: "" },
              ]);
              setSaved(false);
            }}
          >
            {t("+ Dodaj pytanie")}{" "}
          </button>
          <button disabled={busy}>
            {busy
              ? t("Zapisuję…")
              : saved
                ? t("✓ Zapisano")
                : t("Zapisz pytania")}
          </button>
        </div>
        <p className="muted small-text">
          {t(
            "Przed rozpoczęciem zapisz zmiany. Sesja korzysta wyłącznie z zapisanych pytań.",
          )}{" "}
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
  const { t, locale } = useLocale();
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  async function share() {
    setBusy(true);
    setError("");
    try {
      const { createPublication } = await import("./publication");
      const pdf = await createPublication(state, base, setProgress, locale);
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
      aria-label={t("Udostępnianie prezentacji")}
    >
      <p className="eyebrow">
        {state.publishedAt
          ? t("Udostępniona publicznie")
          : t("Tylko w Twoim archiwum")}
      </p>
      <h3>{t("Prezentacja do pobrania")}</h3>
      <p className="muted">
        {t("Udostępnij na Stage PDF ze slajdami i pytaniami.")}{" "}
      </p>
      <Notice>{error}</Notice>
      {state.publishedAt ? (
        <div className="actions">
          <a
            className="button secondary"
            href={`/api/presentations/${state.id}/pdf`}
            download
          >
            {t("Pobierz udostępniony PDF ↓")}{" "}
          </a>
          <button
            className="secondary"
            disabled={busy}
            onClick={() => void withdraw()}
          >
            {t("Wycofaj udostępnienie")}{" "}
          </button>
        </div>
      ) : (
        <button disabled={busy || !state.pdfName} onClick={() => void share()}>
          {busy ? t("Przygotowuję…") : t("Udostępnij")}
        </button>
      )}
      {progress && (
        <p role="status" className="muted">
          {t(progress)}
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
  const { t, locale } = useLocale();
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
    const key = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.isComposing ||
        (event.target instanceof Element &&
          event.target.closest(
            "input, textarea, select, [role='combobox'], [role='listbox'], [contenteditable='true']",
          ))
      )
        return;
      if (
        event.key === " " &&
        event.target instanceof Element &&
        event.target.closest("button, a, summary")
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
      const fullscreen = projector && ["f", "F", "F5"].includes(event.key);
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
        <p>{t("Wczytywanie sesji…")}</p>
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
        <p className="eyebrow">{t("Tak zagłosowała sala")}</p>
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
        <Header
          variant="Live"
          brandUrl="/"
          stageUrl="/"
          className="projector-bar"
        >
          <button
            className="secondary small"
            onClick={() =>
              void document.documentElement.requestFullscreen().catch(() => {})
            }
          >
            {t("Pełny ekran")}
          </button>
        </Header>
        <Notice>{error || live.error}</Notice>
        {state.status === "draft" ? (
          <section className="projector-join">
            <p className="eyebrow">{t("Za chwilę zaczynamy")}</p>
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
                ? t("Dziękuję za udział.")
                : t("Za chwilę zaczynamy.")}
            </p>
          </div>
        )}
        <div className="projector-bottom">
          {projectedQuestion && <QR id={id} compact />}
          {state.status === "live" && (
            <nav className="actions" aria-label={t("Sterowanie prezentacją")}>
              <button
                className="secondary"
                aria-label={t("Poprzedni slajd")}
                title={t("Poprzedni slajd (← / Page Up)")}
                disabled={busy || !connected || !canPrevious}
                onClick={() => navigate(-1)}
              >
                ←
              </button>
              <button
                className="secondary"
                aria-label={t("Następny slajd")}
                title={t("Następny slajd (→ / Page Down / spacja)")}
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
    <Shell badge="Studio">
      <a className="back" href="/presenter">
        {t("← Sesje i archiwum")}{" "}
      </a>
      <div className="session-heading">
        <div>
          <span className={`pill ${state.status}`}>
            {t(statusLabel(state.status))}
          </span>
          <h1>{state.title}</h1>
        </div>
        <div className="session-count">
          <strong>
            {state.participants}
            <small>/{LIMITS.participants}</small>
          </strong>
          <span>{t("uczestników online")}</span>
        </div>
      </div>
      <div
        className="peak-stat"
        aria-label={t("Szczyt uczestników podczas głosowania")}
      >
        <span>{t("Szczyt uczestników podczas głosowania")}</span>
        <strong>
          {state.peakParticipants ?? t("Brak historycznego pomiaru")}
        </strong>
      </div>
      <Notice>{error || live.error}</Notice>
      <div className="session-actions">
        <a
          className="button secondary"
          href={`/presenter/${id}/screen`}
          target="_blank"
          rel="noreferrer"
        >
          {t("Otwórz ekran projektora ↗")}{" "}
        </a>
        <a className="button secondary" href={`${base}/export?lang=${locale}`}>
          {t("Eksport CSV ↓")}{" "}
        </a>
        {state.status === "draft" && (
          <button
            disabled={busy || !connected || !state.pdfName}
            onClick={() => void command({ type: "start" })}
          >
            {t("Rozpocznij sesję →")}{" "}
          </button>
        )}
        {state.status === "live" &&
          (confirmEnd ? (
            <>
              <span>{t("Zakończyć sesję i zamknąć głosowanie?")}</span>
              <button
                className="danger"
                disabled={busy}
                onClick={() => {
                  setConfirmEnd(false);
                  void command({ type: "end" });
                }}
              >
                {t("Tak, zakończ")}{" "}
              </button>
              <button
                className="secondary"
                onClick={() => setConfirmEnd(false)}
              >
                {t("Anuluj")}{" "}
              </button>
            </>
          ) : (
            <button className="secondary" onClick={() => setConfirmEnd(true)}>
              {t("Zakończ sesję")}{" "}
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
              <h2>{t("Prezentacja")}</h2>
              <div className="actions">
                <button
                  aria-label={t("Poprzedni slajd")}
                  className="secondary small"
                  disabled={busy || !connected || !canPrevious}
                  onClick={() => navigate(-1)}
                >
                  ←
                </button>
                <button
                  aria-label={t("Następny slajd")}
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
                <p className="eyebrow">{t("Głosowanie otwarte")}</p>
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
                  {t("Zamknij pytanie")}{" "}
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
                    {t("Po slajdzie")} {q.slide}{" "}
                    {q.slide === state.slide ? t("· teraz") : ""}
                  </p>
                  <h3>{q.text}</h3>
                  <div className="actions question-actions">
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
                        {t("Pokaż pytanie na ekranie")}{" "}
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
                        ? t("Uruchom ponownie od zera ↻")
                        : state.active?.id === q.id
                          ? t("Otwarte")
                          : t("Otwórz pytanie →")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      ) : (
        <section>
          <p className="eyebrow">{t("Archiwum sesji")}</p>
          <Publication state={state} base={base} onUpdate={live.apply} />
          <h2>{t("Tak zagłosowała sala.")}</h2>
          {state.questions?.map((q) => (
            <article key={q.id} className="archive-question">
              <p className="eyebrow">
                {t("Slajd")} {q.slide} ·{" "}
                {state.closedIds?.includes(q.id)
                  ? t("Zamknięte")
                  : t("Nieuruchomione")}
              </p>
              <h3>{q.text}</h3>
              <p className="eyebrow">
                {t("Runda")} {(state.history?.[q.id]?.length ?? 0) + 1}
              </p>
              <Results
                showCounts
                result={state.results![q.id]}
                a={q.a}
                b={q.b}
              />
              {state.history?.[q.id]?.map((previous) => (
                <details key={previous.round}>
                  <summary>
                    {t("Poprzednia runda")} {previous.round}
                  </summary>
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
                {t("Otwórz PDF ↗")}{" "}
              </a>
              <button
                className="text-button"
                disabled={!!state.publishedAt}
                title={
                  state.publishedAt
                    ? t("Najpierw wycofaj udostępnienie")
                    : undefined
                }
                onClick={async () => {
                  if (
                    !window.confirm(
                      t("Usunąć PDF z archiwum? Wyniki pozostaną zapisane."),
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
                {t("Usuń PDF")}{" "}
              </button>
            </div>
          )}
        </section>
      )}
    </Shell>
  );
}
function App() {
  const { t } = useLocale();
  const path = location.pathname;
  if (path === "/") return <Home />;
  if (path === "/presenter" || path === "/presenter/") return <Dashboard />;
  const admin = path.match(/^\/presenter\/([a-f0-9-]{36})(\/screen)?\/?$/);
  if (admin) return <Presenter id={admin[1]} projector={!!admin[2]} />;
  const participant = path.match(/^\/s\/([a-f0-9-]{36})\/?$/);
  if (participant) return <Participant id={participant[1]} />;
  return (
    <Shell>
      <h1>{t("Nie ma takiej strony.")}</h1>
      <p>{t("Otwórz adres z kodu QR prezentera.")}</p>
      <a href="/">{t("Wróć na początek")}</a>
    </Shell>
  );
}
createRoot(document.getElementById("root")!).render(
  <LocaleProvider
    initialLocale={document.documentElement.lang === "en" ? "en" : "pl"}
  >
    <App />
  </LocaleProvider>,
);
