import type { SeoLocale } from './content';
import { brandAssets, languageUrl, seoCopy, seoSurface } from './content';

export function syncBrowserMetadata(locale: SeoLocale) {
  const site = document.documentElement.dataset.site;
  if (site !== 'home' && site !== 'stage') {
    return;
  }
  const surface = seoSurface(site, location.pathname);
  const copy = seoCopy[surface][locale];
  const existingCanonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  const base = existingCanonical ? new URL(existingCanonical.href).origin : location.origin;
  const path = surface === 'home' || surface === 'stage' ? '/' : location.pathname;
  const canonical = languageUrl(base, locale, path);
  document.title = copy.title;
  const meta = (attribute: 'name' | 'property', name: string, value: string) => {
    let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }
    element.content = value;
  };
  meta('name', 'description', copy.description);
  meta('name', 'robots', surface === 'home' || surface === 'stage' ? 'index,follow' : 'noindex,follow');
  for (const property of ['og:title', 'twitter:title']) {
    meta(property.startsWith('og:') ? 'property' : 'name', property, copy.title);
  }
  for (const property of ['og:description', 'twitter:description']) {
    meta(property.startsWith('og:') ? 'property' : 'name', property, copy.description);
  }
  meta('property', 'og:locale', locale === 'pl' ? 'pl_PL' : 'en_GB');
  meta('property', 'og:locale:alternate', locale === 'pl' ? 'en_GB' : 'pl_PL');
  meta('property', 'og:url', canonical);
  meta('property', 'og:image', new URL(brandAssets.image, base).href);
  meta('name', 'twitter:image', new URL(brandAssets.image, base).href);
  if (existingCanonical) {
    existingCanonical.href = canonical;
  }
}
