import {
  brandAssets,
  languageUrl,
  seoCopy,
  seoLocale,
  seoSurface,
} from "../../../packages/seo/content";
import type { Env } from "./env";

export function stageDiscovery(request: Request, env: Env): Response | null {
  if (request.method !== "GET") return null;
  const path = new URL(request.url).pathname;
  const base = env.APP_ORIGIN || "https://stage.codestorybro.com";
  if (path === "/robots.txt")
    return new Response(
      `User-agent: *\nAllow: /\nDisallow: /presenter\nDisallow: /s/\nDisallow: /api/\nSitemap: ${base}/sitemap.xml\n`,
      { headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  if (path === "/sitemap.xml") {
    const pl = languageUrl(base, "pl");
    const en = languageUrl(base, "en");
    const alternatives = `<xhtml:link rel="alternate" hreflang="pl" href="${pl}"/><xhtml:link rel="alternate" hreflang="en" href="${en}"/>`;
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml"><url><loc>${pl}</loc>${alternatives}</url><url><loc>${en}</loc>${alternatives}</url></urlset>`,
      { headers: { "Content-Type": "application/xml; charset=utf-8" } },
    );
  }
  return null;
}

export function stageHtml(
  request: Request,
  env: Env,
  response: Response,
): Response {
  if (!response.headers.get("Content-Type")?.includes("text/html"))
    return response;
  const url = new URL(request.url);
  const locale = seoLocale(url.searchParams.get("lang"));
  const surface = seoSurface("stage", url.pathname);
  const copy = seoCopy[surface][locale];
  const base = env.APP_ORIGIN || "https://stage.codestorybro.com";
  const canonical = languageUrl(base, locale, url.pathname);
  const indexable = surface === "stage";
  const rewriter = new HTMLRewriter()
    .on("html", {
      element(e) {
        e.setAttribute("lang", locale);
      },
    })
    .on("title", {
      element(e) {
        e.setInnerContent(copy.title);
      },
    })
    .on('link[rel="canonical"]', {
      element(e) {
        e.setAttribute("href", canonical);
      },
    })
    .on('link[rel="alternate"]', {
      element(e) {
        if (!indexable) e.remove();
        else
          e.setAttribute(
            "href",
            languageUrl(
              base,
              e.getAttribute("hreflang") === "en" ? "en" : "pl",
            ),
          );
      },
    });
  const values: Record<string, string> = {
    'meta[name="description"]': copy.description,
    'meta[name="robots"]': indexable ? "index,follow" : "noindex,nofollow",
    'meta[property="og:title"]': copy.title,
    'meta[property="og:description"]': copy.description,
    'meta[property="og:url"]': canonical,
    'meta[property="og:locale"]': locale === "pl" ? "pl_PL" : "en_GB",
    'meta[property="og:locale:alternate"]': locale === "pl" ? "en_GB" : "pl_PL",
    'meta[property="og:image"]': new URL(brandAssets.image, base).href,
    'meta[name="twitter:title"]': copy.title,
    'meta[name="twitter:description"]': copy.description,
    'meta[name="twitter:image"]': new URL(brandAssets.image, base).href,
  };
  for (const [selector, value] of Object.entries(values))
    rewriter.on(selector, {
      element(e) {
        e.setAttribute("content", value);
      },
    });
  const result = new Response(response.body, response);
  if (!indexable) result.headers.set("X-Robots-Tag", "noindex, nofollow");
  return rewriter.transform(result);
}
