import type { Metadata } from 'next';

import { CheckPageWrapper } from '@/components/CheckPageWrapper';
import SubscriptionConfirmed from '@/components/SubscriptionConfirmed';
import { AppConfig } from '@/utils/AppConfig';

const SITE_URL = AppConfig.url;

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = `${SITE_URL}/potwierdzenie-subskrypcji`;

  return {
    title: 'Subskrypcja potwierdzona',
    description: 'Twoja subskrypcja newslettera CodeStoryBro została potwierdzona.',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'Subskrypcja potwierdzona | CodeStoryBro',
      description: 'Twoja subskrypcja newslettera CodeStoryBro została potwierdzona.',
      type: 'website',
      url: canonicalUrl,
      siteName: 'CodeStoryBro',
      locale: AppConfig.locale,
      images: [
        {
          url: `${SITE_URL}/assets/img/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'CodeStoryBro - Subskrypcja potwierdzona',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Subskrypcja potwierdzona | CodeStoryBro',
      description: 'Twoja subskrypcja newslettera CodeStoryBro została potwierdzona.',
      images: [`${SITE_URL}/assets/img/og-image.png`],
      creator: '@codestorybro',
      site: '@codestorybro',
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function PotwierzenieSubskrypcji() {
  return (
    <CheckPageWrapper>
      <SubscriptionConfirmed />
    </CheckPageWrapper>
  );
}
