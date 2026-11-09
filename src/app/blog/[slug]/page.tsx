import type { Metadata } from 'next';
import { BlogArticleJsonLd } from '@/components/JsonLd';
import { SiteShell } from '@/components/SiteShell';
import { getBlogPostBySlug, renderBlocksToHtml } from '@/libs/notion';
import { AppConfig } from '@/utils/AppConfig';
import {
  blogPostImageUrl,
  blogPostUrl,
  createBlogPostDescription,
} from '@/utils/BlogSeo';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article not found',
      robots: { index: false, follow: false },
    };
  }

  const contentHtml = post.description ? '' : await renderBlocksToHtml(post.id);
  const description = createBlogPostDescription(post, contentHtml);
  const canonicalUrl = blogPostUrl(post.slug);
  const image = blogPostImageUrl(post);

  return {
    title: post.title,
    description,
    authors: [{ name: AppConfig.author.name, url: AppConfig.url }],
    creator: AppConfig.author.name,
    publisher: AppConfig.name,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      url: canonicalUrl,
      siteName: AppConfig.name,
      locale: AppConfig.locale,
      publishedTime: post.publishedAt,
      modifiedTime: post.modifiedAt || undefined,
      authors: [AppConfig.author.name],
      tags: post.tags,
      images: [{ url: image, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [{ url: image, alt: post.title }],
      creator: '@codestorybro',
      site: '@codestorybro',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const contentHtml = await renderBlocksToHtml(post.id);
  const description = createBlogPostDescription(post, contentHtml);

  return (
    <SiteShell currentSection="Publication archive">
      <BlogArticleJsonLd post={post} description={description} />
      <div className="mx-auto max-w-[70ch] py-12 sm:py-20">
        <Link
          href="/blog"
          className="text-action"
        >
          <span aria-hidden="true">←</span>
          <span className="link-label">Publication archive</span>
        </Link>

        <article className="mt-10">
          <header className="border-b border-rule pb-10 sm:pb-12">
            {post.tags.length > 0 && (
              <div className="mb-5 flex flex-wrap gap-x-3 gap-y-2" aria-label="Topics">
                {post.tags.map(tag => (
                  <span key={tag} className="eyebrow text-accent-strong">{tag}</span>
                ))}
              </div>
            )}
            <h1 className="display-title">
              {post.title}
            </h1>
            {post.description && (
              <p className="mt-6 text-lg leading-8 text-ink sm:text-xl">{post.description}</p>
            )}
            <div className="eyebrow mt-7 flex flex-wrap gap-x-5 gap-y-2 text-muted">
              <time dateTime={post.publishedAt}>{dateFormatter.format(new Date(post.publishedAt))}</time>
              {post.readingTime && (
                <span>
                  {post.readingTime}
                  {' '}
                  min read
                </span>
              )}
            </div>
          </header>

          {post.coverImage && (
            <div className="mt-10 border border-rule bg-surface">
              <Image
                src={`/api/blog-image/${encodeURIComponent(post.id)}`}
                alt={post.title}
                width={1200}
                height={675}
                className="h-auto w-full object-cover"
                sizes="(max-width: 768px) calc(100vw - 40px), 700px"
                unoptimized
                priority
              />
            </div>
          )}

          {/* eslint-disable-next-line react-dom/no-dangerously-set-innerhtml */}
          <div
            className="article-content mt-10 sm:mt-14"
            // Content is escaped and links are protocol-validated by the Notion renderer.
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          <p className="mt-14 border-t border-rule pt-7 text-sm leading-6 text-muted">
            This article is part of my publication archive. I&nbsp;am not currently publishing new posts here.
          </p>
        </article>
      </div>
    </SiteShell>
  );
}
