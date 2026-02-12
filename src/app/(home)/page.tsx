import {
  CredibilitySection,
  CTASection,
  DlaKogoSection,
  FAQSection,
  HeroSection,
  HowItWorksSection,
  ProblemSection,
  SocialProofSection,
  TransformationSection,
} from '@/components/HomeSections';
import { HomeJsonLd } from '@/components/JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://codestorybro.com';

export async function generateMetadata() {
  const canonicalUrl = SITE_URL;

  return {
    title: 'CodeStoryBro | Od developera do Engineering Managera',
    description: 'Przeszedłem drogę od stażysty do managera. Dziś pomagam developerom przejść z ról wykonawczych do zarządzania zespołami. Mentoring 1:1, program grupowy i warsztaty.',
    keywords: [
      'rozwój świadomego developera',
      'jak zostać engineering managerem',
      'przejście od developera do managera',
      'tech lead rozwój',
      'kompetencje managera IT',
      'leadership w IT',
      'szkolenia dla senior developerów',
      'mentoring dla programistów',
      'coaching kariera IT',
      'awans na managera IT',
      'engineering manager Polska',
      'rozwój kariery programisty',
    ],
    authors: [{ name: 'Marcin Kołodziej', url: SITE_URL }],
    creator: 'Marcin Kołodziej',
    publisher: 'CodeStoryBro',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'CodeStoryBro | Od developera do Engineering Managera',
      description: 'Przeszedłem drogę od stażysty do managera. Dziś pomagam developerom przejść z ról wykonawczych do zarządzania zespołami. Mentoring, program grupowy i warsztaty.',
      url: canonicalUrl,
      siteName: 'CodeStoryBro',
      type: 'website',
      locale: 'pl_PL',
      images: [
        {
          url: `${SITE_URL}/assets/img/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'CodeStoryBro | Od developera do Engineering Managera',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@codestorybro',
      creator: '@codestorybro',
      title: 'CodeStoryBro | Od developera do Engineering Managera',
      description: 'Przeszedłem drogę od stażysty do managera. Dziś pomagam developerom przejść z ról wykonawczych do zarządzania zespołami. Mentoring, program grupowy i warsztaty.',
      images: [
        {
          url: `${SITE_URL}/assets/img/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'CodeStoryBro | Od developera do Engineering Managera',
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
      <DlaKogoSection />
      <ProblemSection />
      <TransformationSection />
      <CredibilitySection />
      <HowItWorksSection />
      <SocialProofSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
