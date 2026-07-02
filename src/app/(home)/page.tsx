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
      'świat IT',
      'branża IT',
      'branża technologiczna',
      'technologia',
      'komentarz IT',
      'komentarz technologiczny',
      'absurdy IT',
      'patologie IT',
      'ludzka strona IT',
      'ludzka strona technologii',
      'IT bez korpo-filtra',
      'technologia bez korpo-filtra',
      'branża IT od środka',
      'Engineering Manager',
      'creator IT',
      'content creator IT',
      'komentarze o IT',
      'komentarze o technologii',
      'AI w IT',
      'vibe coding',
      'Big Tech',
      'branża gier',
      'kultura cyfrowa',
      'prelegent IT Polska',
    ],
    authors: [{ name: 'Marcin Kołodziej', url: SITE_URL }],
    creator: 'Marcin Kołodziej',
    publisher: 'CodeStoryBro',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: AppConfig.title,
      description: AppConfig.description,
      url: canonicalUrl,
      siteName: 'CodeStoryBro',
      type: 'website',
      locale: AppConfig.locale,
      images: [
        {
          url: `${SITE_URL}/assets/img/og-image.png`,
          width: 1536,
          height: 1024,
          alt: 'CodeStoryBro — IT i technologia wprost',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@codestorybro',
      creator: '@codestorybro',
      title: AppConfig.title,
      description: AppConfig.description,
      images: [
        {
          url: `${SITE_URL}/assets/img/og-image.png`,
          width: 1536,
          height: 1024,
          alt: 'CodeStoryBro — IT i technologia wprost',
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
