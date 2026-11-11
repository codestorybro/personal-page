import { writeFile } from "node:fs/promises";
import { PDFDocument } from "pdf-lib";
import assert from "node:assert/strict";
import { chromium, expect } from "@playwright/test";
import { startServer, samplePdf } from "./harness.mjs";
const server = await startServer(8794);
const errors = [];
const browser = await chromium.launch({
  channel: process.env.PLAYWRIGHT_CHANNEL || "chrome",
  headless: true,
});
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(server.origin);
  const language = page.getByRole("combobox", { name: "Język" });
  await expect(language).toContainText("PL");
  await language.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("listbox")).toBeVisible();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Better conversations. Stronger teams.",
  );
  await page.keyboard.press("Enter");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("Enter");
  await page.goto(`${server.origin}/presenter`);
  await expect(page.locator(".csb-badge")).toHaveText("Studio");
  await expect(page.getByRole("combobox", { name: "Język" })).toContainText(
    "PL",
  );
  await page.getByLabel("Nowa sesja").fill("Architektura to sztuka wyboru");
  await page.getByRole("button", { name: "Utwórz sesję" }).click();
  await expect(
    page.getByRole("heading", { name: "Architektura to sztuka wyboru" }),
  ).toBeVisible();
  await page.getByLabel("Dodaj PDF").setInputFiles({
    name: "prezentacja.pdf",
    mimeType: "application/pdf",
    buffer: samplePdf(2),
  });
  await expect(page.getByText("2 slajdów")).toBeVisible();
  await page.getByRole("button", { name: "Dodaj pytanie" }).click();
  await page.getByLabel("Treść pytania").fill("Monolit czy mikroserwisy?");
  await page.getByLabel("A", { exact: true }).fill("Zaczynam od monolitu");
  await page.getByLabel("B", { exact: true }).fill("Wybieram mikroserwisy");
  await page.getByRole("button", { name: "Dodaj pytanie" }).click();
  const secondQuestion = page.locator(".question-editor").last();
  await secondQuestion.getByLabel("Po slajdzie").fill("2");
  await secondQuestion.getByLabel("Treść pytania").fill("Drugie pytanie");
  await secondQuestion.getByLabel("A", { exact: true }).fill("Druga A");
  await secondQuestion.getByLabel("B", { exact: true }).fill("Druga B");
  await page.getByRole("button", { name: "Zapisz pytania" }).click();
  await expect(page.getByRole("button", { name: "Zapisano" })).toBeVisible();
  await page.screenshot({
    path: "/private/tmp/codestorybro-live-setup.png",
    fullPage: true,
  });
  const id = new URL(page.url()).pathname.split("/").at(-1);
  const phoneContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const phone = await phoneContext.newPage();
  phone.on("pageerror", (e) => errors.push(e.message));
  await phone.goto(`${server.origin}/s/${id}?lang=pl`);
  await expect(
    phone.getByRole("heading", { name: "Jesteś na miejscu." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Rozpocznij sesję" }).click();
  await expect(
    page.getByRole("heading", { name: "Prezentacja", exact: true }),
  ).toBeVisible();
  await expect(page.locator("canvas")).toBeVisible();
  await expect
    .poll(() => page.locator("canvas").evaluate((canvas) => canvas.width))
    .toBeGreaterThan(300);
  await expect(page.locator(".csb-header nav")).toHaveCount(0);
  await page.getByRole("combobox", { name: "Język" }).focus();
  await page.keyboard.press("Enter");
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("canvas")).toHaveAttribute("aria-label", "Slajd 1");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("listbox")).toHaveCount(0);
  await page.locator("h1").click();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".presenter-preview h1")).toHaveText(
    "Monolit czy mikroserwisy?",
  );
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator("canvas")).toHaveAttribute("aria-label", "Slajd 1");
  await page.keyboard.press("PageDown");
  await expect(page.locator(".presenter-preview h1")).toHaveText("Monolit czy mikroserwisy?");
  await page.keyboard.press("PageUp");
  await expect(page.locator("canvas")).toHaveAttribute("aria-label", "Slajd 1");
  const screen = await context.newPage();
  screen.on("pageerror", (e) => errors.push(e.message));
  await screen.goto(`${server.origin}/presenter/${id}/screen`);
  await expect(screen.locator("canvas")).toBeVisible();
  await expect(screen.locator(".csb-badge")).toHaveText("Live");
  await expect(
    screen
      .locator(".csb-header")
      .getByRole("link", { name: "Prezentacje", exact: true }),
  ).toHaveCount(0);
  await expect(
    screen
      .locator(".csb-header")
      .getByRole("link", { name: "YouTube", exact: true }),
  ).toBeVisible();
  await expect(screen.getByText("Połączono na żywo")).toHaveCount(0);
  // No QR under slides; preserve the original PDF proportions and fill the viewport.
  await expect(screen.locator(".qr-card")).toHaveCount(0);
  await expect(page.locator(".live-grid .qr-card")).toHaveCount(0);
  const pdfBox = await screen.locator(".pdf").boundingBox();
  if (pdfBox.height < 800)
    throw new Error("PDF does not use the available projector height");
  await screen.screenshot({
    path: "/private/tmp/codestorybro-live-large-slide.png",
  });
  await screen
    .getByRole("button", { name: "Pełny ekran", exact: true })
    .click();
  await expect
    .poll(() => screen.evaluate(() => !!document.fullscreenElement))
    .toBe(true);
  await expect(screen.locator(".projector-bar")).toBeHidden();
  await expect(screen.locator(".projector-bottom nav")).toBeHidden();
  const fullPdf = await screen.locator(".pdf").boundingBox();
  assert.equal(fullPdf.height, await screen.evaluate(() => innerHeight));
  await screen.keyboard.press("PageDown");
  await expect(
    screen.getByRole("heading", { name: "Monolit czy mikroserwisy?" }),
  ).toBeVisible();
  await expect(screen.locator(".qr-card")).toBeVisible();
  await expect(screen.locator(".projector-bar")).toBeHidden();
  await expect(screen.locator(".projector-bottom nav")).toBeHidden();
  await expect(screen.getByText("Wybierz na swoim telefonie")).toHaveCount(0);
  assert.equal((await screen.locator(".qr-card img").boundingBox()).width, 300);
  await screen.screenshot({
    path: "/private/tmp/codestorybro-live-fullscreen-question.png",
  });
  await expect(
    page
      .locator(".presenter-preview")
      .getByRole("heading", { name: "Monolit czy mikroserwisy?" }),
  ).toBeVisible();
  await expect(page.locator(".presenter-preview canvas")).toHaveCount(0);
  await expect(
    phone.getByRole("heading", { name: "Monolit czy mikroserwisy?" }),
  ).toBeVisible();
  await phone.getByRole("combobox", { name: "Język" }).click();
  await phone.getByRole("option", { name: "EN", exact: true }).click();
  await expect(
    phone.getByText("Voting is open", { exact: true }),
  ).toBeVisible();
  await expect(
    phone.getByRole("heading", { name: "Monolit czy mikroserwisy?" }),
  ).toBeVisible();
  await expect(
    phone.getByRole("button", { name: /A Zaczynam od monolitu/ }),
  ).toBeVisible();
  await phone.getByRole("combobox", { name: "Language" }).click();
  await phone.getByRole("option", { name: "PL", exact: true }).click();
  await phone.getByRole("button", { name: /A Zaczynam od monolitu/ }).click();
  await expect(phone.getByText("✓ Przyjęto odpowiedź A")).toBeVisible();
  await phone.getByRole("button", { name: /B Wybieram mikroserwisy/ }).click();
  await expect(phone.getByText("✓ Przyjęto odpowiedź B")).toBeVisible();
  await phone.screenshot({
    path: "/private/tmp/codestorybro-live-phone.png",
    fullPage: true,
  });
  await expect(page.locator(".session-count strong")).toHaveText("1/200");
  await phone.goto("about:blank");
  await expect(page.locator(".session-count strong")).toHaveText("0/200");
  await expect(page.locator(".peak-stat strong")).toHaveText("1");
  await expect(phone.locator(".peak-stat")).toHaveCount(0);
  await phone.goto(`${server.origin}/s/${id}?lang=pl`);
  await expect(page.locator(".session-count strong")).toHaveText("1/200");
  await phone.reload();
  await expect(phone.getByText("✓ Przyjęto odpowiedź B")).toBeVisible();
  await screen.keyboard.press("PageDown");
  await expect(
    phone.getByRole("heading", { name: "Głosowanie zamknięte." }),
  ).toBeVisible();
  await expect(screen.getByText("Tak zagłosowała sala")).toBeVisible();
  await expect(
    page.locator(".presenter-preview").getByText("Tak zagłosowała sala"),
  ).toBeVisible();
  await expect(screen.locator(".results small")).toHaveCount(0);
  await expect(phone.locator(".results small")).toHaveCount(0);
  await expect(phone.locator(".results > .muted")).toHaveCount(0);
  await page.screenshot({
    path: "/private/tmp/codestorybro-live-presenter.png",
    fullPage: true,
  });
  await screen.screenshot({
    path: "/private/tmp/codestorybro-live-screen.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Uruchom ponownie od zera" }).click();
  await expect(
    phone.getByRole("button", { name: /B Wybieram mikroserwisy/ }),
  ).toHaveAttribute("aria-pressed", "false");
  await expect(
    page.locator(".active-panel").getByText(/0 głosów/),
  ).toBeVisible();
  await expect(screen.locator(".results small")).toHaveCount(0);
  await expect(screen.locator(".results > .muted")).toHaveCount(0);
  await phone.getByRole("button", { name: /A Zaczynam od monolitu/ }).click();
  await expect(phone.getByText("✓ Przyjęto odpowiedź A")).toBeVisible();
  await screen.keyboard.press("PageDown");
  await expect(screen.getByText("Tak zagłosowała sala")).toBeVisible();
  await expect(
    page.locator(".presenter-preview").getByText("Tak zagłosowała sala"),
  ).toBeVisible();
  await screen.keyboard.press("PageDown");
  await expect(page.locator("canvas")).toHaveAttribute("aria-label", "Slajd 2");
  await expect(screen.locator(".qr-card")).toHaveCount(0);
  await screen.keyboard.press("PageDown");
  await expect(
    screen.getByRole("heading", { name: "Drugie pytanie" }),
  ).toBeVisible();
  await phone.getByRole("button", { name: /B Druga B/ }).click();
  await expect(phone.getByText("✓ Przyjęto odpowiedź B")).toBeVisible();
  await screen.keyboard.press("PageDown");
  await expect(screen.getByText("Tak zagłosowała sala")).toBeVisible();
  await expect(
    page.locator(".presenter-preview").getByText("Tak zagłosowała sala"),
  ).toBeVisible();
  await screen.keyboard.press("PageUp"); // PDF 2
  await expect(screen.locator("canvas")).toHaveAttribute(
    "aria-label",
    "Slajd 2",
  );
  await screen.keyboard.press("PageUp"); // Closed question 1, not the latest result of question 2.
  await expect(
    screen.getByRole("heading", { name: "Monolit czy mikroserwisy?" }),
  ).toBeVisible();
  await expect(screen.getByText("Tak zagłosowała sala")).toBeVisible();
  await expect(
    page.locator(".presenter-preview").getByText("Tak zagłosowała sala"),
  ).toBeVisible();
  await expect(screen.locator(".result").first().locator("strong")).toHaveText(
    "100%",
  );
  await screen.keyboard.press("PageUp");
  await expect(screen.locator("canvas")).toHaveAttribute(
    "aria-label",
    "Slajd 1",
  );
  await screen.evaluate(() => document.exitFullscreen());
  await expect(screen.locator(".projector-bar")).toBeVisible();
  await screen.getByRole("button", { name: "Następny slajd" }).click();
  await expect(
    screen.getByRole("heading", { name: "Monolit czy mikroserwisy?" }),
  ).toBeVisible();
  await expect(screen.getByText("Tak zagłosowała sala")).toBeVisible();
  await expect(
    page.locator(".presenter-preview").getByText("Tak zagłosowała sala"),
  ).toBeVisible();
  await screen.keyboard.press("PageDown");
  await expect(screen.locator("canvas")).toHaveAttribute(
    "aria-label",
    "Slajd 2",
  );
  await page
    .locator(".question-item")
    .filter({ hasText: "Monolit czy mikroserwisy?" })
    .getByRole("button", { name: "Pokaż pytanie na ekranie" })
    .click();
  await expect(
    screen.getByRole("heading", { name: "Monolit czy mikroserwisy?" }),
  ).toBeVisible();
  await expect(screen.locator(".result").first().locator("strong")).toHaveText(
    "100%",
  );
  await page
    .getByRole("button", { name: "Zakończ sesję", exact: true })
    .click();
  await page.getByRole("button", { name: "Tak, zakończ" }).click();
  await expect(
    page.getByRole("heading", { name: "Tak zagłosowała sala." }),
  ).toBeVisible();
  await expect(
    phone.getByRole("heading", { name: "Dzięki za udział." }),
  ).toBeVisible();
  await expect(page.getByText("Poprzednia runda 1")).toBeVisible();
  await page.reload();
  await expect(page.locator(".peak-stat strong")).toHaveText("1");
  await expect(phone.locator("body")).toHaveJSProperty("scrollWidth", 390);
  const home = await phoneContext.newPage();
  await home.goto(server.origin);
  await expect(home.getByRole("link", { name: /Pobierz PDF/ })).toHaveCount(0);
  assert.equal(
    (
      await home.request.get(`${server.origin}/api/presentations/${id}/pdf`)
    ).ok(),
    false,
  );
  await page.getByRole("button", { name: "Udostępnij", exact: true }).click();
  await expect(
    page.getByText("Udostępniona publicznie", { exact: true }),
  ).toBeVisible({ timeout: 20000 });
  await home.reload();
  await expect(home.getByRole("link", { name: /Pobierz PDF/ })).toHaveCount(1);
  const download = await home.request.get(
    `${server.origin}/api/presentations/${id}/pdf`,
  );
  assert.equal(download.status(), 200);
  assert.match(download.headers()["content-disposition"], /attachment/);
  const bytes = await download.body();
  await writeFile("/private/tmp/codestorybro-live-publication.pdf", bytes);
  const published = await PDFDocument.load(bytes);
  assert.equal(published.getPageCount(), 4);
  assert.equal(published.getTitle(), "Architektura to sztuka wyboru");
  const original = await PDFDocument.load(samplePdf(2));
  assert.deepEqual(
    published.getPage(0).getSize(),
    original.getPage(0).getSize(),
  );
  assert.deepEqual(
    published.getPage(2).getSize(),
    original.getPage(1).getSize(),
  );
  await expect(home.locator("body")).toHaveJSProperty("scrollWidth", 390);
  await home.screenshot({
    path: "/private/tmp/codestorybro-live-library-mobile.png",
    fullPage: true,
  });
  await page.screenshot({
    path: "/private/tmp/codestorybro-live-publication-panel.png",
    fullPage: true,
  });
  // Render the actual downloaded PDF, including inserted question pages, for visual QA.
  const preview = await context.newPage();
  await preview.route("**/__qa_pdfjs.mjs", (route) =>
    route.fulfill({
      path: "node_modules/pdfjs-dist/build/pdf.mjs",
      contentType: "text/javascript",
    }),
  );
  await preview.route("**/__qa_pdfworker.mjs", (route) =>
    route.fulfill({
      path: "node_modules/pdfjs-dist/build/pdf.worker.mjs",
      contentType: "text/javascript",
    }),
  );
  await preview.goto(server.origin);
  await preview.evaluate(
    async (data) => {
      const { getDocument, GlobalWorkerOptions } = await import(
        "/__qa_pdfjs.mjs"
      );
      GlobalWorkerOptions.workerSrc = "/__qa_pdfworker.mjs";
      const pdf = await getDocument({ data: new Uint8Array(data) }).promise;
      document.body.replaceChildren();
      for (const number of [2, 4]) {
        const page = await pdf.getPage(number);
        const canvas = document.createElement("canvas");
        const viewport = page.getViewport({ scale: 1.4 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        document.body.append(canvas);
        await page.render({ canvas, viewport }).promise;
      }
    },
    [...bytes],
  );
  await preview.screenshot({
    path: "/private/tmp/codestorybro-live-publication-render.png",
    fullPage: true,
  });
  await preview.close();
  await page.getByRole("button", { name: "Wycofaj udostępnienie" }).click();
  await expect(
    page.getByRole("button", { name: "Udostępnij", exact: true }),
  ).toBeVisible();
  await home.reload();
  await expect(home.getByRole("link", { name: /Pobierz PDF/ })).toHaveCount(0);
  assert.equal(
    (
      await home.request.get(`${server.origin}/api/presentations/${id}/pdf`)
    ).ok(),
    false,
  );
  // Deleting the session also withdraws a subsequently shared copy.
  await page.getByRole("button", { name: "Udostępnij", exact: true }).click();
  await expect(
    page.getByText("Udostępniona publicznie", { exact: true }),
  ).toBeVisible({ timeout: 20000 });
  await page.getByRole("link", { name: "← Sesje i archiwum" }).click();
  const sessionRow = page
    .locator(".session-row")
    .filter({ hasText: "Architektura to sztuka wyboru" });
  page.once("dialog", (dialog) => dialog.dismiss());
  await sessionRow.getByRole("button", { name: "Usuń sesję" }).click();
  await expect(sessionRow).toBeVisible();
  page.once("dialog", (dialog) => dialog.accept());
  await sessionRow.getByRole("button", { name: "Usuń sesję" }).click();
  await expect(sessionRow).toHaveCount(0);
  await expect(
    phone.getByText("Sesja została usunięta przez prezentera."),
  ).toBeVisible();
  await home.reload();
  await expect(home.getByRole("link", { name: /Pobierz PDF/ })).toHaveCount(0);
  assert.equal(
    (
      await home.request.get(`${server.origin}/api/presentations/${id}/pdf`)
    ).ok(),
    false,
  );
  if (errors.length) throw new Error(errors.join("\n"));
  console.log(
    "PASS: browser setup → PDF → question → phone A/B → reload → close → projector → archive; no JS errors or phone overflow.",
  );
} catch (error) {
  console.error("Browser errors:", errors);
  throw error;
} finally {
  await browser.close();
  await server.stop();
}
