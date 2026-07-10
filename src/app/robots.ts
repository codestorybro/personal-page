import type { MetadataRoute } from 'next';
import { AppConfig } from '@/utils/AppConfig';

export const dynamic = 'force-dynamic';

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === 'production'
    : process.env.NODE_ENV === 'production';

  if (!isProduction) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
      sitemap: `${AppConfig.url}/sitemap.xml`,
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/api/blog-image/'],
        disallow: [
          '/api/',
          '/linktree.html',
          '/preview/',
          '/draft/',
          '/internal/',
        ],
      },
    ],
    sitemap: `${AppConfig.url}/sitemap.xml`,
    host: AppConfig.url,
  };
}
