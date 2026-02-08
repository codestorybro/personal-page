import type { Metadata } from 'next';

import { FadeInUp } from '@/components/AnimatedElements';

import { BlogList } from '@/components/BlogList';
import { BlogListJsonLd } from '@/components/JsonLd';
import { getBlogPosts } from '@/libs/notion';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type BlogPageProps = {
  params: Promise<{ locale: string }>;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://codestorybro.com';

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Blog' });

  const canonicalUrl = `${SITE_URL}/${locale}/blog`;

  return {
    title: `${t('title')} | CodeStoryBro`,
    description: t('description'),
    keywords: [
      'blog',
      'programowanie',
      'software development',
      'inżynieria oprogramowania',
      'zarządzanie zespołem',
      'CodeStoryBro',
    ],
    authors: [{ name: 'Marcin Kołodziej', url: SITE_URL }],
    creator: 'Marcin Kołodziej',
    publisher: 'CodeStoryBro',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        pl: `${SITE_URL}/pl/blog`,
        en: `${SITE_URL}/en/blog`,
      },
    },
    openGraph: {
      title: `${t('title')} | CodeStoryBro`,
      description: t('description'),
      type: 'website',
      url: canonicalUrl,
      siteName: 'CodeStoryBro',
      locale,
      images: [
        {
          url: `${SITE_URL}/assets/img/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${t('title')} – CodeStoryBro`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('title')} | CodeStoryBro`,
      description: t('description'),
      images: [`${SITE_URL}/assets/img/og-image.png`],
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

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Blog' });
  const posts = await getBlogPosts();

  const translations = {
    search_placeholder: t('search_placeholder'),
    read_more: t('read_more'),
    min_read: t('min_read'),
    no_posts: t('no_posts'),
    all_tags: t('all_tags'),
    clear_filters: t('clear_filters'),
  };

  return (
    <main className="min-h-screen py-16 sm:py-24">
      <BlogListJsonLd locale={locale} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeInUp>
          <div className="relative mb-12 w-fit">
            {/* Glow blur behind the title */}
            <div
              className="pointer-events-none absolute -inset-4 bg-indigo-500/40 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <h1 className="bg-gradient-to-r from-indigo-400 via-green-400 to-blue-400 bg-clip-text pb-2 text-4xl font-bold leading-relaxed text-transparent sm:text-5xl lg:text-6xl">
                {t('title')}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-gray-400">
                {t('subtitle')}
              </p>
            </div>
          </div>
        </FadeInUp>

        {/* Blog list */}
        <BlogList posts={posts} translations={translations} locale={locale} />
      </div>
    </main>
  );
}
