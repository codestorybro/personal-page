import type { BlogPost } from '@/libs/notion';
import { render } from '@testing-library/react';
import { BlogArticleJsonLd } from './JsonLd';

const post: BlogPost = {
  id: 'article-id',
  slug: 'structured-data-article',
  title: 'Structured data article',
  description: 'A real description.',
  publishedAt: '2025-01-10',
  modifiedAt: '2025-01-12T08:30:00.000Z',
  tags: ['Engineering'],
  coverImage: null,
  readingTime: null,
};

describe('BlogArticleJsonLd', () => {
  it('emits valid article and breadcrumb schemas with absolute URLs', () => {
    const { container } = render(
      <BlogArticleJsonLd post={post} description={post.description} />,
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    const schema = JSON.parse(script?.textContent || '{}');
    const [article, breadcrumbs] = schema['@graph'];

    expect(article).toMatchObject({
      '@type': 'BlogPosting',
      'headline': post.title,
      'datePublished': post.publishedAt,
      'dateModified': post.modifiedAt,
      'url': 'https://www.codestorybro.com/blog/structured-data-article',
      'image': 'https://www.codestorybro.com/assets/img/og-codestorybro.png',
    });
    expect(breadcrumbs['@type']).toBe('BreadcrumbList');
    expect(breadcrumbs.itemListElement).toHaveLength(3);
  });
});
