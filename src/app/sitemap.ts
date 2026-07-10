import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/libs/notion';
import { AppConfig } from '@/utils/AppConfig';
import { blogPostUrl } from '@/utils/BlogSeo';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();
  const articleUrls: MetadataRoute.Sitemap = posts.map((post) => {
    const entry: MetadataRoute.Sitemap[number] = {
      url: blogPostUrl(post.slug),
      changeFrequency: 'monthly',
      priority: 0.6,
    };

    if (post.modifiedAt) {
      entry.lastModified = post.modifiedAt;
    }

    return entry;
  });

  return [
    {
      url: AppConfig.url,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${AppConfig.url}/blog`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...articleUrls,
  ];
}
