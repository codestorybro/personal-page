import { OfertaJsonLd } from '@/components/JsonLd';
import {
  AcademySection,
  CorporateSection,
  MentoringSection,
  OfferCTASection,
  OfferHeroSection,
  SpeakingSection,
} from '@/components/OfferSections';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://codestorybro.com';

export async function generateMetadata() {
  const canonicalUrl = `${SITE_URL}/oferta`;

  return {
    title: 'Oferta | Mentoring i szkolenia dla developerów',
    description: 'Mentoring 1:1, program grupowy i warsztaty dla developerów. Przejdź z roli technicznej do Engineering Managera z CodeStoryBro.',
    keywords: [
      'mentoring dla programistów',
      'szkolenia engineering manager',
      'coaching dla developerów',
      'warsztaty leadership IT',
      'rozwój tech lead',
      'przejście do managera',
      'mentoring IT Polska',
      'szkolenia managerskie IT',
      'coaching kariera IT',
      'program rozwoju liderów IT',
    ],
    authors: [{ name: 'Marcin Kołodziej', url: SITE_URL }],
    creator: 'Marcin Kołodziej',
    publisher: 'CodeStoryBro',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'Oferta | Mentoring dla developerów | CodeStoryBro',
      description: 'Mentoring 1:1, program grupowy i warsztaty. Pomogę Ci przejść z roli technicznej do Engineering Managera.',
      url: canonicalUrl,
      siteName: 'CodeStoryBro',
      type: 'website',
      locale: 'pl_PL',
      images: [
        {
          url: `${SITE_URL}/assets/img/og-oferta.png`,
          width: 1200,
          height: 630,
          alt: 'CodeStoryBro | Oferta mentoringu i szkoleń dla developerów',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@codestorybro',
      creator: '@codestorybro',
      title: 'Oferta | Mentoring dla developerów | CodeStoryBro',
      description: 'Mentoring 1:1, program grupowy i warsztaty. Przejdź z roli technicznej do Engineering Managera.',
      images: [
        {
          url: `${SITE_URL}/assets/img/og-oferta.png`,
          width: 1200,
          height: 630,
          alt: 'CodeStoryBro | Oferta mentoringu i szkoleń dla developerów',
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

export default function OfertaPage() {
  return (
    <>
      <OfertaJsonLd />
      <OfferHeroSection />
      <MentoringSection />
      <AcademySection />
      <CorporateSection />
      <SpeakingSection />
      <OfferCTASection />
    </>
  );
}
