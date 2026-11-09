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
      <div className="mx-auto max-w-4xl py-14 sm:py-20 lg:py-24">
        <header className="mb-10 sm:mb-14">
          <p className="eyebrow text-accent-strong">Writing</p>
          <h1 className="display-title mt-5">
            Publication Archive
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink">
            Archived articles about software development, engineering leadership, technology, and the software industry.
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-muted">
            This is an archive of previously published work. I&nbsp;am not currently publishing new posts here.
          </p>
        </header>

        <BlogArchive posts={posts} />
      </div>
    </SiteShell>
  );
}
