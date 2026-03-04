import type { Metadata } from 'next';

import { BlogPostView } from '@/components/BlogPostView';
import { BlogArticleJsonLd } from '@/components/JsonLd';
import { getBlogPostBySlug, renderBlocksToHtml } from '@/libs/notion';

import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codestorybro.com';
  const postUrl = `${siteUrl}/blog/${slug}`;

  if (!post) {
    return {
      title: 'Post not found | CodeStoryBro',
    };
  }

  const ogImage = post.coverImage || `${siteUrl}/assets/img/og-default.png`;

  return {
    title: `${post.title} | CodeStoryBro`,
    description: post.description,
    keywords: [...post.tags, 'CodeStoryBro', 'programowanie', 'software development', 'blog'],
    authors: [{ name: 'Marcin Kołodziej', url: siteUrl }],
    creator: 'Marcin Kołodziej',
    publisher: 'CodeStoryBro',
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: postUrl,
      siteName: 'CodeStoryBro',
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
      authors: ['Marcin Kołodziej'],
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'pl',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      creator: '@codestorybro',
      site: '@codestorybro',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        'index': true,
        'follow': true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const contentHtml = await renderBlocksToHtml(post.id);

  const translations = {
    back_to_blog: 'Wróć do bloga',
    share: 'Udostępnij:',
    min_read: 'min czytania',
    published_on: 'Opublikowano',
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codestorybro.com';

  return (
    <>
      <BlogArticleJsonLd
        title={post.title}
        description={post.description}
        slug={post.slug}
        publishedAt={post.publishedAt}
        coverImage={post.coverImage}
        tags={post.tags}
      />
      <BlogPostView
        post={post}
        contentHtml={contentHtml}
        translations={translations}
        siteUrl={siteUrl}
      />
    </>
  );
}
