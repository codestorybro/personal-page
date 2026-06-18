import type { Metadata } from 'next';

import CertificateForm from '@/components/CertificateForm';
import CertValidate from '@/components/CertValidate';
import { CheckPageWrapper } from '@/components/CheckPageWrapper';
import { AppConfig } from '@/utils/AppConfig';
import { Suspense } from 'react';

const SITE_URL = AppConfig.url;

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = `${SITE_URL}/check`;

  return {
    title: 'Weryfikacja certyfikatu',
    description: 'Zweryfikuj autentyczność certyfikatu CodeStoryBro. Wprowadź ID certyfikatu, aby sprawdzić jego ważność.',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'Weryfikacja certyfikatu | CodeStoryBro',
      description: 'Zweryfikuj autentyczność certyfikatu CodeStoryBro. Wprowadź ID certyfikatu, aby sprawdzić jego ważność.',
      type: 'website',
      url: canonicalUrl,
      siteName: 'CodeStoryBro',
      locale: AppConfig.locale,
      images: [
        {
          url: `${SITE_URL}/assets/img/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'CodeStoryBro - Weryfikacja certyfikatu',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Weryfikacja certyfikatu | CodeStoryBro',
      description: 'Zweryfikuj autentyczność certyfikatu CodeStoryBro. Wprowadź ID certyfikatu, aby sprawdzić jego ważność.',
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

type Props = {
  searchParams: Promise<{ certId?: string }>;
};

export default async function Check({ searchParams }: Props) {
  const { certId } = await searchParams;

  return (
    <CheckPageWrapper
      title="Sprawdź certyfikat"
      subtitle="Wprowadź ID certyfikatu, aby zweryfikować jego autentyczność"
    >
      <CertificateForm certId={certId} />

      <div className="flex flex-col items-center justify-center">
        <Suspense fallback={<p></p>}>
          <CertValidate id={certId} />
        </Suspense>
      </div>
    </CheckPageWrapper>
  );
};
