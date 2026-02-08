import type { Metadata } from 'next';

import { BlogPostView } from '@/components/BlogPostView';
import { getBlogPostBySlug, getBlogPosts, renderBlocksToHtml } from '@/libs/notion';

import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

type BlogPostPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post not found | CodeStoryBro',
    };
  }

  return {
    title: `${post.title} | CodeStoryBro`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: ['Marcin Kołodziej'],
      images: post.coverImage ? [{ url: post.coverImage }] : [],
      locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map(post => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'Blog' });
  const contentHtml = await renderBlocksToHtml(post.id);

  const translations = {
    back_to_blog: t('back_to_blog'),
    share: t('share'),
    min_read: t('min_read'),
    published_on: t('published_on'),
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codestorybro.com';

  return (
    <BlogPostView
      post={post}
      contentHtml={contentHtml}
      translations={translations}
      locale={locale}
      siteUrl={siteUrl}
    />
  );
}
