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
      <p className="rounded-2xl border border-white/10 bg-white/[0.025] px-6 py-8 leading-7 text-zinc-400">
        The publication archive is temporarily unavailable.
      </p>
    );
  }

  return (
    <ol className="divide-y divide-white/10 border-y border-white/10">
      {posts.map(post => (
        <li key={post.id}>
          <Link
            href={blogPostPath(post.slug)}
            className="group grid gap-4 rounded-xl px-2 py-7 no-underline transition-colors hover:bg-white/[0.025] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:grid-cols-[9rem_minmax(0,1fr)] sm:px-4 sm:py-9"
          >
            <time className="font-mono text-xs uppercase tracking-[0.12em] text-zinc-500" dateTime={post.publishedAt}>
              {dateFormatter.format(new Date(post.publishedAt))}
            </time>
            <div>
              <h2 className="text-xl font-semibold leading-snug -tracking-wide text-zinc-100 transition-colors group-hover:text-cyan-100 sm:text-2xl">
                {post.title}
              </h2>
              {post.description && (
                <p className="mt-3 max-w-2xl leading-7 text-zinc-400">{post.description}</p>
              )}
              {post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2" aria-label="Topics">
                  {post.tags.map(tag => (
                    <span key={tag} className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-zinc-600">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
}
