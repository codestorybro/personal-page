import { HomeJsonLd } from '@/components/JsonLd';
import { LinktreeHub } from '@/components/LinktreeHub';
import { AppConfig } from '@/utils/AppConfig';

const SITE_URL = AppConfig.url;

export async function generateMetadata() {
  const canonicalUrl = SITE_URL;

  return {
    title: {
      absolute: AppConfig.title,
    },
    description: AppConfig.description,
    keywords: [
      'CodeStoryBro',
      'Marcin Kołodziej',
      'polskie IT',
      'rynek pracy IT',
      'zwolnienia IT',
      'rekrutacje IT',
      'rekrutacje widmo',
      'AI w IT',
      'vibe coding',
      'programista',
      'kariera IT',
      'technologia',
      'branża technologiczna',
      'Engineering Manager',
      'speaker IT',
      'komentarz do rynku IT',
      'praca programisty',
    ],
    authors: [{ name: 'Marcin Kołodziej', url: SITE_URL }],
    creator: 'Marcin Kołodziej',
    publisher: 'CodeStoryBro',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: AppConfig.title,
      description: AppConfig.openGraphDescription,
      url: canonicalUrl,
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
      title: AppConfig.title,
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

export default function Index() {
  return (
    <>
      <HomeJsonLd />
      <LinktreeHub />
    </>
  );
}
