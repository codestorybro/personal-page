import {
  CTASection,
  HeroSection,
  LeadershipSection,
  ProblemSection,
  SeriesSection,
  SpeakerSection,
  ThreadsBridge,
} from '@/components/HomeSections';
import { HomeJsonLd } from '@/components/JsonLd';
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
      'manager IT',
      'Engineering Manager',
      'leadership w IT',
      'zarządzanie zespołem IT',
      'zarządzanie ludźmi w IT',
      'manager w IT',
      'świeży manager',
      'początkujący manager',
      'tech lead',
      'awans na managera',
      'trudne rozmowy w pracy',
      'feedback w IT',
      'kariera w IT',
      'przywództwo w IT',
      'kultura pracy w IT',
      'odpowiedzialność managera',
      'rozwój managera',
      'prelegent IT Polska',
      'CodeStoryBro',
      'Marcin Kołodziej',
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
          alt: 'CodeStoryBro – najtrudniejsze w IT rzadko jest techniczne',
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
          alt: 'CodeStoryBro – najtrudniejsze w IT rzadko jest techniczne',
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
      <HeroSection />
      <ProblemSection />
      <LeadershipSection />
      <SeriesSection />
      <SpeakerSection />
      <ThreadsBridge />
      <CTASection />
    </>
  );
}
