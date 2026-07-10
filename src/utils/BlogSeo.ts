import type { BlogPost } from '@/libs/notion';
import { AppConfig } from '@/utils/AppConfig';

const META_DESCRIPTION_MAX_LENGTH = 160;

export function blogPostPath(slug: string): string {
  return `/blog/${encodeURIComponent(slug)}`;
}

export function blogPostUrl(slug: string): string {
  return `${AppConfig.url}${blogPostPath(slug)}`;
}

export function blogPostImageUrl(post: BlogPost): string {
  return post.coverImage
    ? `${AppConfig.url}/api/blog-image/${encodeURIComponent(post.id)}`
    : `${AppConfig.url}/assets/img/og-image.png`;
}

export function normalizeArticleText(value: string): string {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, '\'')
    .replace(/\s+/g, ' ')
    .trim();
}

function trimDescription(value: string): string {
  if (value.length <= META_DESCRIPTION_MAX_LENGTH) {
    return value;
  }

  const shortened = value
    .slice(0, META_DESCRIPTION_MAX_LENGTH - 1)
    .trimEnd()
    .replace(/[,!?;:]+$/u, '');
  return `${shortened}…`;
}

export function createBlogPostDescription(post: BlogPost, contentHtml = ''): string {
  const explicitDescription = normalizeArticleText(post.description);
  if (explicitDescription) {
    return trimDescription(explicitDescription);
  }

  const excerpt = normalizeArticleText(contentHtml);
  if (excerpt) {
    return trimDescription(excerpt);
  }

  return trimDescription(`Archived CodeStoryBro article: ${post.title}.`);
}
