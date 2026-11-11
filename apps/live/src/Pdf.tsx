import { useEffect, useRef, useState } from "react";
import { useLocale } from "../../../packages/ui/Locale";
import {
  getDocument,
  GlobalWorkerOptions,
  type PDFDocumentProxy,
} from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
GlobalWorkerOptions.workerSrc = workerUrl;
export async function inspectPdf(file: File): Promise<number> {
  const doc = await getDocument({
    data: new Uint8Array(await file.arrayBuffer()),
  }).promise;
  try {
    return doc.numPages;
  } finally {
    await doc.destroy();
  }
}
export function Pdf({ url, page }: { url: string; page: number }) {
  const { t, locale } = useLocale();
  const canvas = useRef<HTMLCanvasElement>(null);
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [error, setError] = useState("");
  const [width, setWidth] = useState(900);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new ResizeObserver((entries) =>
      setWidth(entries[0].contentRect.width),
    );
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    setError("");
    setDoc(null);
    let cancelled = false;
    const task = getDocument({
      url,
      withCredentials: true,
      cMapUrl: "/pdf/cmaps/",
      cMapPacked: true,
      standardFontDataUrl: "/pdf/standard_fonts/",
      wasmUrl: "/pdf/wasm/",
    });
    task.promise
      .then((pdf) => {
        if (!cancelled) setDoc(pdf);
      })
      .catch((e) => {
        if (!cancelled) setError(`Nie udało się otworzyć PDF: ${e.message}`);
      });
    return () => {
      cancelled = true;
      void task.destroy();
    };
  }, [url]);
  useEffect(() => {
    if (!doc || !canvas.current || width <= 0) return;
    let cancelled = false;
    let render:
      | ReturnType<Awaited<ReturnType<PDFDocumentProxy["getPage"]>>["render"]>
      | undefined;
    doc
      .getPage(page)
      .then((p) => {
        if (cancelled || !canvas.current) return;
        const initial = p.getViewport({ scale: 1 });
        const scale =
          (Math.min(window.devicePixelRatio || 1, 2) * width) / initial.width;
        const viewport = p.getViewport({ scale });
        // Keep the previous frame visible until PDF.js has finished the next one.
        const buffer = document.createElement("canvas");
        buffer.width = viewport.width;
        buffer.height = viewport.height;
        render = p.render({ canvas: buffer, viewport });
        return render.promise.then(() => {
          if (cancelled || !canvas.current) return;
          const target = canvas.current;
          const context = target.getContext("2d");
          if (!context) return;
          // Resize and copy synchronously: the browser cannot paint a cleared frame.
          target.width = buffer.width;
          target.height = buffer.height;
          context.drawImage(buffer, 0, 0);
          target.setAttribute("aria-label", t(`Slajd ${page}`));
        });
      })
      .catch((e) => {
        if (!cancelled && e.name !== "RenderingCancelledException")
          setError("Nie udało się wyświetlić slajdu.");
      });
    return () => {
      cancelled = true;
      render?.cancel();
    };
  }, [doc, page, width, locale]);
  return (
    <div className="pdf" ref={container}>
      {error ? (
        <p role="alert">{t(error)}</p>
      ) : (
        <>
          <canvas ref={canvas} aria-label={t("Wczytywanie slajdu")} />
        </>
      )}
    </div>
  );
}
