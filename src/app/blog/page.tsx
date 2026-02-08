import type { Metadata } from 'next';

import { FadeInUp } from '@/components/AnimatedElements';

import { BlogList } from '@/components/BlogList';
import { BlogListJsonLd } from '@/components/JsonLd';
import { getBlogPosts } from '@/libs/notion';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://codestorybro.com';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = `${SITE_URL}/blog`;

  return {
    title: 'Blog | CodeStoryBro',
    description: 'O inżynierii i zespołach z perspektywy praktyka. Decyzje, błędy i lekcje z perspektywy managera.',
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
    },
    openGraph: {
      title: 'Blog | CodeStoryBro',
      description: 'O inżynierii i zespołach z perspektywy praktyka. Decyzje, błędy i lekcje z perspektywy managera.',
      type: 'website',
      url: canonicalUrl,
      siteName: 'CodeStoryBro',
      locale: 'pl',
      images: [
        {
          url: `${SITE_URL}/assets/img/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'Blog – CodeStoryBro',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog | CodeStoryBro',
      description: 'O inżynierii i zespołach z perspektywy praktyka. Decyzje, błędy i lekcje z perspektywy managera.',
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

export default async function BlogPage() {
  const posts = await getBlogPosts();

  const translations = {
    search_placeholder: 'Szukaj artykułów...',
    read_more: 'Czytaj więcej',
    min_read: 'min czytania',
    no_posts: 'Nie znaleziono artykułów pasujących do kryteriów.',
    all_tags: 'Wszystkie',
    clear_filters: 'Wyczyść filtry',
  };

  return (
    <main className="min-h-screen py-16 sm:py-24">
      <BlogListJsonLd />
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
                Blog
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-gray-400">
                Moje myśli, spostrzeżenia i doświadczenia spisane w jednym miejscu.
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
