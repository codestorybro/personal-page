import type { MetadataRoute } from 'next';
import { routing } from '@/libs/i18nNavigation';
import { getBaseUrl } from '@/utils/Helpers';

export const dynamic = 'force-dynamic';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  return routing.locales.flatMap(locale => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ]);
}
