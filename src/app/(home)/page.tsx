import {
  CTASection,
  HeroSection,
  ProblemSection,
  SpeakerSection,
  TransformationSection,
} from '@/components/HomeSections';
import { HomeJsonLd } from '@/components/JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://codestorybro.com';

export async function generateMetadata() {
  const canonicalUrl = SITE_URL;

  return {
    title: 'CodeStoryBro | Mówię głośno to, co połowa branży myśli po cichu',
    description: 'Wypalenie, utrata sensu, fake sukcesy na LinkedIn. Mówię otwarcie o\u00A0tym, co naprawdę dzieje się w\u00A0IT. Dla developerów i\u00A0managerów, którzy czują, że coś się popsuło.',
    keywords: [
      'wypalenie w IT',
      'sens pracy programisty',
      'burnout developer',
      'prelegent IT Polska',
      'keynote speaker IT',
      'kryzys sensu w tech',
      'CodeStoryBro',
      'Marcin Kołodziej',
      'głos branży IT',
      'wartość programisty',
    ],
    authors: [{ name: 'Marcin Kołodziej', url: SITE_URL }],
    creator: 'Marcin Kołodziej',
    publisher: 'CodeStoryBro',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'CodeStoryBro | Mówię głośno to, co połowa branży myśli po cichu',
      description: 'Wypalenie, utrata sensu, fake sukcesy na LinkedIn. Mówię otwarcie o\u00A0tym, co naprawdę dzieje się w\u00A0IT.',
      url: canonicalUrl,
      siteName: 'CodeStoryBro',
      type: 'website',
      locale: 'pl_PL',
      images: [
        {
          url: `${SITE_URL}/assets/img/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'CodeStoryBro | Mówię głośno to, co połowa branży myśli po cichu',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@codestorybro',
      creator: '@codestorybro',
      title: 'CodeStoryBro | Mówię głośno to, co połowa branży myśli po cichu',
      description: 'Wypalenie, utrata sensu, fake sukcesy na LinkedIn. Mówię otwarcie o\u00A0tym, co naprawdę dzieje się w\u00A0IT.',
      images: [
        {
          url: `${SITE_URL}/assets/img/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'CodeStoryBro | Mówię głośno to, co połowa branży myśli po cichu',
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
      <TransformationSection />
      <SpeakerSection />
      <CTASection />
    </>
  );
}
