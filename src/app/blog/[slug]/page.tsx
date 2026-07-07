import type { BlogPost } from '@/libs/notion';

import type { Metadata } from 'next';
import { BlogPostView } from '@/components/BlogPostView';
import { BlogArticleJsonLd } from '@/components/JsonLd';
import { getBlogPostBySlug, renderBlocksToHtml } from '@/libs/notion';
import { AppConfig } from '@/utils/AppConfig';

import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

const META_DESCRIPTION_MAX_LENGTH = 160;

function normalizeText(value: string): string {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, '\'')
    .replace(/\s+/g, ' ')
    .trim();
}

function trimMetaDescription(value: string): string {
  if (value.length <= META_DESCRIPTION_MAX_LENGTH) {
    return value;
  }

  return `${value.slice(0, META_DESCRIPTION_MAX_LENGTH - 3).trimEnd().replace(/[,.!?;:]+$/, '')}...`;
}

function createBlogPostDescription(post: BlogPost, contentHtml: string = ''): string {
  const explicitDescription = normalizeText(post.description);
  if (explicitDescription) {
    return trimMetaDescription(explicitDescription);
  }

  const contentDescription = normalizeText(contentHtml);
  if (contentDescription) {
    return trimMetaDescription(contentDescription);
  }

  const topics = post.tags.slice(0, 4).join(', ');
  const topicSuffix = topics ? ` Tematy: ${topics}.` : '';

  return trimMetaDescription(`Archiwalny tekst CodeStoryBro: ${post.title}.${topicSuffix}`);
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  const siteUrl = AppConfig.url;
  const postUrl = `${siteUrl}/blog/${slug}`;

  if (!post) {
    return {
      title: 'Nie znaleziono artykułu',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const ogImage = post.coverImage || `${siteUrl}/assets/img/og-default.png`;
  const description = post.description.trim()
    ? createBlogPostDescription(post)
    : createBlogPostDescription(post, await renderBlocksToHtml(post.id));

  return {
    title: post.title,
    description,
    keywords: [...post.tags, 'CodeStoryBro', 'blog IT', 'polskie IT', 'rynek pracy IT', 'AI w IT', 'vibe coding', 'praca programisty'],
    authors: [{ name: 'Marcin Kołodziej', url: siteUrl }],
    creator: 'Marcin Kołodziej',
    publisher: 'CodeStoryBro',
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description,
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
      locale: AppConfig.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
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
  const description = createBlogPostDescription(post, contentHtml);
  const postWithDescription = post.description.trim()
    ? post
    : { ...post, description };

  const translations = {
    back_to_blog: 'Wróć do bloga',
    share: 'Udostępnij',
    min_read: 'min czytania',
    published_on: 'Opublikowano',
  };

  const siteUrl = AppConfig.url;

  return (
    <>
      <BlogArticleJsonLd
        title={post.title}
        description={description}
        slug={post.slug}
        publishedAt={post.publishedAt}
        coverImage={post.coverImage}
        tags={post.tags}
      />
      <BlogPostView
        post={postWithDescription}
        contentHtml={contentHtml}
        translations={translations}
        siteUrl={siteUrl}
      />
    </>
  );
}
