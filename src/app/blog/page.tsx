import type { Metadata } from 'next';
import { BlogArchive } from '@/components/BlogArchive';
import { BlogArchiveJsonLd } from '@/components/JsonLd';
import { SiteShell } from '@/components/SiteShell';
import { getBlogPosts } from '@/libs/notion';
import { AppConfig } from '@/utils/AppConfig';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

const title = 'Publication Archive | CodeStoryBro';
const description = 'Archived articles by CodeStoryBro about software development, engineering leadership, technology, and the software industry.';
const archiveUrl = `${AppConfig.url}/blog`;
const socialImage = `${AppConfig.url}/assets/img/og-image.png`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: archiveUrl },
  openGraph: {
    title,
    description,
    type: 'website',
    url: archiveUrl,
    siteName: AppConfig.name,
    locale: AppConfig.locale,
    images: [{ url: socialImage, alt: 'CodeStoryBro publication archive' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [{ url: socialImage, alt: 'CodeStoryBro publication archive' }],
    creator: '@codestorybro',
    site: '@codestorybro',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <SiteShell currentSection="Publication archive">
      <BlogArchiveJsonLd posts={posts} />
      <main className="mx-auto max-w-4xl py-14 sm:py-20 lg:py-24">
        <header className="mb-12 border-b border-white/10 pb-10 sm:mb-16 sm:pb-14">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">Writing</p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight -tracking-wider sm:text-6xl">
            Publication Archive
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
            Archived articles about software development, engineering leadership, technology, and the software industry.
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-zinc-500">
            This is an archive of previously published work. I&nbsp;am not currently publishing new posts here.
          </p>
        </header>

        <BlogArchive posts={posts} />
      </main>
    </SiteShell>
  );
}
