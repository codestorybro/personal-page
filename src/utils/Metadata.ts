import type { Metadata } from 'next';
import type { SeoLocale } from '../../packages/seo/content';
import { brandAssets, languageUrl, seoCopy } from '../../packages/seo/content';
import { AppConfig } from './AppConfig';

export function pageMetadata(surface: 'home' | 'check', locale: SeoLocale, index = surface === 'home'): Metadata {
  const copy = seoCopy[surface][locale];
  const path = surface === 'check' ? '/check' : '/';
  const canonical = languageUrl(AppConfig.url, locale, path);
  const image = { url: brandAssets.image, width: 1200, height: 630, alt: 'CodeStoryBro' };
  return {
    metadataBase: new URL(AppConfig.url),
    title: { absolute: copy.title },
    description: copy.description,
    applicationName: 'CodeStoryBro',
    authors: [{ name: AppConfig.author.name, url: AppConfig.url }],
    creator: AppConfig.author.name,
    publisher: 'CodeStoryBro',
    alternates: {
      canonical,
      languages: { 'pl': languageUrl(AppConfig.url, 'pl', path), 'en': languageUrl(AppConfig.url, 'en', path), 'x-default': languageUrl(AppConfig.url, 'pl', path) },
    },
    openGraph: {
      type: 'website',
      siteName: 'CodeStoryBro',
      url: canonical,
      locale: locale === 'pl' ? 'pl_PL' : 'en_GB',
      alternateLocale: [locale === 'pl' ? 'en_GB' : 'pl_PL'],
      title: copy.title,
      description: copy.description,
      images: [image],
    },
    twitter: { card: 'summary_large_image', title: copy.title, description: copy.description, images: [image] },
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
        { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
        { url: '/favicon.ico', sizes: 'any' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    },
    robots: { index, follow: true, googleBot: { 'index': index, 'follow': true, 'max-image-preview': 'large' } },
  };
}
