import type { MetadataRoute } from 'next';
import { AppConfig } from '@/utils/AppConfig';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: AppConfig.url, changeFrequency: 'monthly', priority: 1.0 }];
}
