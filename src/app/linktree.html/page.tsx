import type { Metadata } from 'next';
import { HomeJsonLd } from '@/components/JsonLd';
import { PersonalLanding } from '@/components/PersonalLanding';
import { AppConfig } from '@/utils/AppConfig';

const SITE_URL = AppConfig.url;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      absolute: AppConfig.title,
    },
    description: AppConfig.description,
    alternates: {
      canonical: SITE_URL,
    },
    openGraph: {
      title: AppConfig.openGraphTitle,
      description: AppConfig.openGraphDescription,
      url: SITE_URL,
      siteName: 'CodeStoryBro',
      type: 'website',
      locale: AppConfig.locale,
      images: [
        {
          url: `${SITE_URL}/assets/img/og-image.png`,
          width: 1536,
          height: 1024,
          alt: AppConfig.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@codestorybro',
      creator: '@codestorybro',
      title: AppConfig.twitterTitle,
      description: AppConfig.twitterDescription,
      images: [
        {
          url: `${SITE_URL}/assets/img/og-image.png`,
          width: 1536,
          height: 1024,
          alt: AppConfig.ogImageAlt,
        },
      ],
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function LinktreePage() {
  return (
    <>
      <HomeJsonLd />
      <PersonalLanding />
    </>
  );
}
