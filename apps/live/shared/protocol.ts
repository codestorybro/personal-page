export type Choice = "A" | "B";
export type Question = {
  id: string;
  slide: number;
  text: string;
  a: string;
  b: string;
};
export type Result = { A: number; B: number; total: number };
export type PublicResult = { percentA: number; percentB: number };
export function percentages(result: Result): PublicResult {
  const percentA = result.total
    ? Math.round((result.A / result.total) * 100)
    : 0;
  return { percentA, percentB: result.total ? 100 - percentA : 0 };
}
export type SessionMeta = {
  id: string;
  title: string;
  createdAt: string;
  status: "draft" | "live" | "ended";
  questions: Question[];
  activeId: string | null;
  closedIds: string[];
  rounds: Record<string, number>;
  slide: number;
  pageCount: number;
  displayQuestionId: string | null;
  revision: number;
  navigationVersion: number;
  pdfKey: string | null;
  pdfName: string | null;
  deleting?: boolean;
  publication?: { key: string; publishedAt: string } | null;
};
export type Snapshot = {
  type: "state";
  id: string;
  title: string;
  status: SessionMeta["status"];
  revision: number;
  navigationVersion: number;
  participants: number;
  slide: number;
  pageCount: number;
  displayQuestionId: string | null;
  active: (Question & { round: number }) | null;
  lastClosed: (Question & { result: Result | PublicResult }) | null;
  vote: { choice: Choice; seq: number } | null;
  questions?: Question[];
  results?: Record<string, Result>;
  history?: Record<string, { round: number; result: Result }[]>;
  closedIds?: string[];
  pdfName?: string | null;
  publishedAt?: string | null;
};
export type Summary = {
  id: string;
  title: string;
  createdAt: string;
  status: SessionMeta["status"];
  participants: number;
  questions: number;
  totalParticipants: number;
  deleting?: boolean;
};
export type Command =
  | { type: "start" | "close" | "end" }
  | { type: "open" | "show-question"; questionId: string }
  | { type: "slide"; slide: number }
  | { type: "navigate"; direction: 1 | -1; navigationVersion: number };
export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export function parseQuestions(value: unknown): Question[] {
  if (!Array.isArray(value) || value.length > 100)
    throw new HttpError(400, "Maksymalnie 100 pytań.");
  const seen = new Set<string>();
  return value.map((q: unknown) => {
    if (!q || typeof q !== "object")
      throw new HttpError(400, "Niepoprawne pytanie.");
    const row = q as Record<string, unknown>;
    const id =
      typeof row.id === "string" && /^[\w-]{1,64}$/.test(row.id)
        ? row.id
        : crypto.randomUUID();
    if (seen.has(id))
      throw new HttpError(400, "Powtórzony identyfikator pytania.");
    seen.add(id);
    if (
      !Number.isInteger(row.slide) ||
      Number(row.slide) < 1 ||
      Number(row.slide) > 2000
    )
      throw new HttpError(400, "Slajd musi być liczbą od 1 do 2000.");
    const text = boundedText(row.text, 500, "Treść pytania");
    return {
      id,
      slide: Number(row.slide),
      text,
      a: boundedText(row.a, 160, "Odpowiedź A"),
      b: boundedText(row.b, 160, "Odpowiedź B"),
    };
  });
}
export function boundedText(
  value: unknown,
  max: number,
  label: string,
): string {
  if (typeof value !== "string" || !value.trim() || value.trim().length > max)
    throw new HttpError(400, `${label}: od 1 do ${max} znaków.`);
  return value.trim();
}

export function presentationSteps(pageCount: number, questions: Question[]) {
  const steps: { slide: number; questionId: string | null }[] = [];
  const bySlide = new Map<number, Question[]>();
  for (const q of questions)
    bySlide.set(q.slide, [...(bySlide.get(q.slide) ?? []), q]);
  for (let slide = 1; slide <= pageCount; slide++) {
    steps.push({ slide, questionId: null });
    for (const q of bySlide.get(slide) ?? [])
      steps.push({ slide, questionId: q.id });
  }
  return steps;
}

export type PublishedPresentation = {
  id: string;
  title: string;
  publishedAt: string;
  pages: number;
};
