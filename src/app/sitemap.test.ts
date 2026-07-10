import type { BlogPost } from '@/libs/notion';
import { getBlogPosts } from '@/libs/notion';
import sitemap from './sitemap';

vi.mock('@/libs/notion', () => ({
  getBlogPosts: vi.fn(),
}));

const publishedPost: BlogPost = {
  id: 'published-id',
  slug: 'published-article',
  title: 'Published article',
  description: 'Description',
  publishedAt: '2025-02-10',
  modifiedAt: '2025-03-12T10:00:00.000Z',
  tags: [],
  coverImage: null,
  readingTime: null,
};

describe('sitemap', () => {
  it('contains public pages and every post returned by the published-post query', async () => {
    vi.mocked(getBlogPosts).mockResolvedValue([publishedPost]);

    await expect(sitemap()).resolves.toEqual([
      expect.objectContaining({ url: 'https://www.codestorybro.com' }),
      expect.objectContaining({ url: 'https://www.codestorybro.com/blog' }),
      expect.objectContaining({
        url: 'https://www.codestorybro.com/blog/published-article',
        lastModified: publishedPost.modifiedAt,
      }),
    ]);
  });

  it('does not fabricate a last-modified value', async () => {
    vi.mocked(getBlogPosts).mockResolvedValue([{ ...publishedPost, modifiedAt: null }]);
    const entries = await sitemap();

    expect(entries[2]).not.toHaveProperty('lastModified');
  });
});
