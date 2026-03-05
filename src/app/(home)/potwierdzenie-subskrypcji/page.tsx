import type { Metadata } from 'next';

import { CheckPageWrapper } from '@/components/CheckPageWrapper';
import SubscriptionConfirmed from '@/components/SubscriptionConfirmed';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://codestorybro.com';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = `${SITE_URL}/potwierdzenie-subskrypcji`;

  return {
    title: 'Subskrypcja potwierdzona | CodeStoryBro',
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
      locale: 'pl',
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
  };
}

export default function PotwierzenieSubskrypcji() {
  return (
    <CheckPageWrapper>
      <SubscriptionConfirmed />
    </CheckPageWrapper>
  );
}
