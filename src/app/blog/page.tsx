import type { Metadata } from 'next';

import { FadeInUp } from '@/components/AnimatedElements';

import { BlogList } from '@/components/BlogList';
import { BlogListJsonLd } from '@/components/JsonLd';
import { getBlogPosts } from '@/libs/notion';
import { AppConfig } from '@/utils/AppConfig';

export const dynamic = 'force-dynamic';

const SITE_URL = AppConfig.url;
const BLOG_TITLE = 'Blog CodeStoryBro | IT, AI i kariera programisty';
const BLOG_HEADING = 'Blog CodeStoryBro';
const BLOG_INTRO = 'Teksty o IT, AI, karierze, pracy programisty i rynku technologicznym.';
const BLOG_DESCRIPTION = 'Archiwalne i aktualne teksty o IT, AI, karierze, pracy programisty, zespołach i rynku technologicznym.';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = `${SITE_URL}/blog`;

  return {
    title: {
      absolute: BLOG_TITLE,
    },
    description: BLOG_DESCRIPTION,
    keywords: [
      'CodeStoryBro',
      'Marcin Kołodziej',
      'blog IT',
      'polskie IT',
      'rynek pracy IT',
      'zwolnienia IT',
      'rekrutacje IT',
      'rekrutacje widmo',
      'AI w IT',
      'vibe coding',
      'kariera IT',
      'programista',
      'branża technologiczna',
      'archiwum bloga IT',
    ],
    authors: [{ name: 'Marcin Kołodziej', url: SITE_URL }],
    creator: 'Marcin Kołodziej',
    publisher: 'CodeStoryBro',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: BLOG_TITLE,
      description: BLOG_DESCRIPTION,
      type: 'website',
      url: canonicalUrl,
      siteName: 'CodeStoryBro',
      locale: AppConfig.locale,
      images: [
        {
          url: `${SITE_URL}/assets/img/og-image.png`,
          width: 1536,
          height: 1024,
          alt: 'Blog CodeStoryBro — IT, AI i kariera programisty',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: BLOG_TITLE,
      description: BLOG_DESCRIPTION,
      images: [
        {
          url: `${SITE_URL}/assets/img/og-image.png`,
          width: 1536,
          height: 1024,
          alt: 'Blog CodeStoryBro — IT, AI i kariera programisty',
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

export default async function BlogPage() {
  const posts = await getBlogPosts();

  const translations = {
    search_placeholder: 'Szukaj tekstów o IT, AI, karierze i technologii...',
    read_more: 'Czytaj tekst',
    min_read: 'min czytania',
    no_posts: 'Nie ma tekstów pasujących do tych kryteriów.',
    all_tags: 'Wszystkie',
    clear_filters: 'Wyczyść filtry',
  };

  return (
    <main className="min-h-screen py-16 sm:py-24">
      <BlogListJsonLd />
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <FadeInUp>
          <div className="relative mb-12 w-fit">
            {/* Glow blur behind the title */}
            <div
              className="pointer-events-none absolute -inset-4 bg-indigo-500/40 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative max-w-3xl">
              <h1 className="bg-gradient-to-r from-indigo-400 via-green-400 to-blue-400 bg-clip-text pb-2 text-3xl font-bold leading-relaxed text-transparent sm:text-4xl lg:text-5xl">
                {BLOG_HEADING}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-gray-300 sm:text-lg">
                {BLOG_INTRO}
              </p>
            </div>
          </div>
        </FadeInUp>

        {/* Blog list */}
        <BlogList posts={posts} translations={translations} />
      </div>
    </main>
  );
}
