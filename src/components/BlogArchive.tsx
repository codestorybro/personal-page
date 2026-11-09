import type { BlogPost } from '@/libs/notion';
import { blogPostPath } from '@/utils/BlogSeo';
import Link from 'next/link';

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export function BlogArchive({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return (
      <p className="border-y border-rule py-8 leading-7 text-muted">
        The publication archive is temporarily unavailable.
      </p>
    );
  }

  return (
    <ol className="divide-y divide-rule border-y border-rule">
      {posts.map(post => (
        <li key={post.id} data-reveal="">
          <Link
            href={blogPostPath(post.slug)}
            className="editorial-row grid grid-cols-[minmax(0,1fr)_auto] gap-3 py-7 sm:grid-cols-[9rem_minmax(0,1fr)_auto] sm:gap-5 sm:py-9"
          >
            <time className="eyebrow col-span-2 text-muted sm:col-span-1 sm:pt-2" dateTime={post.publishedAt}>
              {dateFormatter.format(new Date(post.publishedAt))}
            </time>
            <div>
              <h2 className="row-title">
                <span className="link-label">{post.title}</span>
              </h2>
              {post.description && (
                <p className="mt-3 max-w-2xl leading-7 text-muted">{post.description}</p>
              )}
              {post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2" aria-label="Topics">
                  {post.tags.map(tag => (
                    <span key={tag} className="eyebrow text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <span className="row-arrow" aria-hidden="true">↗</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
