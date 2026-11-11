import type { MetadataRoute } from 'next';
import { AppConfig } from '@/utils/AppConfig';
import { languageUrl } from '../../packages/seo/content';

export default function sitemap(): MetadataRoute.Sitemap {
  return (['pl', 'en'] as const).map(locale => ({
    url: languageUrl(AppConfig.url, locale),
    changeFrequency: 'monthly',
    priority: locale === 'pl' ? 1.0 : 0.8,
    alternates: { languages: { pl: languageUrl(AppConfig.url, 'pl'), en: languageUrl(AppConfig.url, 'en') } },
  }));
}
