import type { BlogPost } from '@/libs/notion';
import {
  blogPostImageUrl,
  blogPostUrl,
  createBlogPostDescription,
} from '@/utils/BlogSeo';

const post: BlogPost = {
  id: 'page-id',
  slug: 'article-slug',
  title: 'A useful article',
  description: '',
  publishedAt: '2025-01-10',
  modifiedAt: null,
  tags: ['Software'],
  coverImage: null,
  readingTime: null,
};

describe('blog SEO helpers', () => {
  it('builds absolute canonical and fallback image URLs on the production host', () => {
    expect(blogPostUrl(post.slug)).toBe('https://www.codestorybro.com/blog/article-slug');
    expect(blogPostImageUrl(post)).toBe('https://www.codestorybro.com/assets/img/og-image.png');
  });

  it('uses a plain-text article excerpt when no explicit description exists', () => {
    expect(createBlogPostDescription(post, '<p>Readable &amp; accurate article content.</p>'))
      .toBe('Readable & accurate article content.');
  });

  it('keeps generated descriptions within the metadata limit', () => {
    expect(createBlogPostDescription(post, `<p>${'content '.repeat(40)}</p>`).length)
      .toBeLessThanOrEqual(160);
  });
});
