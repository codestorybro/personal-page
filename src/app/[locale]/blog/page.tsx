import type { Metadata } from 'next';

import { FadeInUp } from '@/components/AnimatedElements';

import { BlogList } from '@/components/BlogList';
import { getBlogPosts } from '@/libs/notion';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type BlogPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Blog' });

  return {
    title: `${t('title')} | CodeStoryBro`,
    description: t('description'),
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
