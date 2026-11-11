import { PDFDocument } from "pdf-lib";
import { translate } from "../../../packages/ui/translations";
import {
  percentages,
  presentationSteps,
  type Question,
  type Snapshot,
} from "../shared/protocol";

function lines(context: CanvasRenderingContext2D, text: string, width: number) {
  const output: string[] = [];
  for (const paragraph of text.split(/\n/)) {
    let line = "";
    for (const word of paragraph.split(/\s+/)) {
      if (line && context.measureText(`${line} ${word}`).width > width) {
        output.push(line);
        line = "";
      }
      // Also wrap long identifiers/URLs instead of clipping them.
      for (const character of (line ? " " : "") + word) {
        if (context.measureText(line + character).width > width && line) {
          output.push(line);
          line = "";
        }
        line += character;
      }
    }
    output.push(line);
  }
  return output;
}
function questionImage(
  question: Question,
  state: Snapshot,
  locale: "en" | "pl",
): Promise<Blob> {
  const t = (text: string) => translate(locale, text);
  const canvas = document.createElement("canvas");
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#191919";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.textBaseline = "top";
  ctx.fillStyle = "#a9c9ef";
  ctx.font = "bold 26px Arial";
  ctx.fillText("CodeStoryBro Live", 110, 64);
  const result = state.results?.[question.id];
  const closed = state.closedIds?.includes(question.id);
  ctx.fillStyle = "#a5a4a2";
  ctx.font = "26px Arial";
  ctx.fillText(
    t(
      closed
        ? result?.total
          ? "Tak zagłosowała sala"
          : "Brak odpowiedzi"
        : "Pytanie do refleksji",
    ),
    110,
    112,
  );
  let size = 76;
  let title: string[] = [],
    a: string[] = [],
    b: string[] = [];
  let answerSize = 46;
  for (; size >= 32; size -= 2) {
    ctx.font = `${size}px Georgia`;
    title = lines(ctx, question.text, 1700);
    answerSize = Math.max(28, size * 0.61);
    ctx.font = `${answerSize}px Arial`;
    a = lines(ctx, `A   ${question.a}`, 1480);
    b = lines(ctx, `B   ${question.b}`, 1480);
    if (
      title.length * size * 1.2 +
        (a.length + b.length) * answerSize * 1.3 +
        210 <
      810
    )
      break;
  }
  let y = 196;
  ctx.fillStyle = "#f1e9db";
  ctx.font = `${size}px Georgia`;
  for (const line of title) {
    ctx.fillText(line, 110, y);
    y += size * 1.2;
  }
  y += 60;
  const percent = result ? percentages(result) : null;
  for (const [text, value] of [
    [a, percent?.percentA],
    [b, percent?.percentB],
  ] as const) {
    ctx.font = `${answerSize}px Arial`;
    ctx.fillStyle = "#f1e9db";
    for (let i = 0; i < text.length; i++)
      ctx.fillText(text[i], 110, y + i * answerSize * 1.3);
    if (closed && result?.total) {
      ctx.textAlign = "right";
      ctx.fillStyle = "#a9c9ef";
      ctx.fillText(`${value}%`, 1810, y);
      ctx.textAlign = "left";
    }
    y += text.length * answerSize * 1.3 + 22;
    if (closed && result?.total) {
      ctx.fillStyle = "#344454";
      ctx.fillRect(110, y, 1700, 22);
      ctx.fillStyle = "#a9c9ef";
      ctx.fillRect(110, y, (1700 * (value ?? 0)) / 100, 22);
    }
    y += 62;
  }
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) =>
        blob
          ? resolve(blob)
          : reject(new Error("Nie udało się przygotować pytania.")),
      "image/png",
    ),
  );
}

export async function createPublication(
  state: Snapshot,
  base: string,
  progress: (text: string) => void,
  locale: "en" | "pl" = "en",
): Promise<Blob> {
  if (state.status !== "ended" || !state.pdfName)
    throw new Error("Najpierw zakończ sesję z PDF-em.");
  progress("Pobieram oryginalną prezentację…");
  const response = await fetch(`${base}/pdf`);
  if (!response.ok) throw new Error("Nie udało się pobrać oryginalnego PDF-u.");
  let source: PDFDocument;
  try {
    source = await PDFDocument.load(await response.arrayBuffer());
  } catch {
    throw new Error(
      "Nie można przygotować tego PDF-u. Sprawdź, czy plik nie jest zaszyfrowany lub uszkodzony.",
    );
  }
  if (source.getPageCount() !== state.pageCount)
    throw new Error("Liczba stron PDF nie zgadza się z sesją.");
  const output = await PDFDocument.create();
  output.setTitle(state.title);
  output.setAuthor("CodeStoryBro, Marcin Kołodziej");
  output.setLanguage(locale);
  // Copy originals together to preserve shared resources and avoid duplicating fonts/images.
  const originals = await output.copyPages(source, source.getPageIndices());
  const steps = presentationSteps(state.pageCount, state.questions ?? []);
  for (let i = 0; i < steps.length; i++) {
    progress(`Przygotowuję stronę ${i + 1} z ${steps.length}…`);
    const step = steps[i];
    if (!step.questionId) output.addPage(originals[step.slide - 1]);
    else {
      const question = state.questions!.find((q) => q.id === step.questionId)!;
      const blob = await questionImage(question, state, locale);
      const image = await output.embedPng(await blob.arrayBuffer());
      output
        .addPage([960, 540])
        .drawImage(image, { x: 0, y: 0, width: 960, height: 540 });
    }
  }
  const bytes = await output.save();
  if (bytes.byteLength > 75_000_000)
    throw new Error(
      "Gotowy PDF przekracza limit 75 MB. Zmniejsz rozmiar oryginalnej prezentacji.",
    );
  return new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
}
