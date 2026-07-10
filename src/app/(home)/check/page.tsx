import type { Metadata } from 'next';

import CertificateForm from '@/components/CertificateForm';
import CertValidate from '@/components/CertValidate';
import { CheckPageWrapper } from '@/components/CheckPageWrapper';
import { AppConfig } from '@/utils/AppConfig';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';

const SITE_URL = AppConfig.url;

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = `${SITE_URL}/check`;

  return {
    title: 'Certificate verification',
    description: 'Verify the authenticity of a CodeStoryBro certificate using its certificate ID.',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'Certificate verification | CodeStoryBro',
      description: 'Verify the authenticity of a CodeStoryBro certificate using its certificate ID.',
      type: 'website',
      url: canonicalUrl,
      siteName: 'CodeStoryBro',
      locale: AppConfig.locale,
      images: [
        {
          url: `${SITE_URL}/assets/img/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'CodeStoryBro certificate verification',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Certificate verification | CodeStoryBro',
      description: 'Verify the authenticity of a CodeStoryBro certificate using its certificate ID.',
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
      title="Verify a certificate"
      subtitle="Enter the certificate ID to confirm its authenticity"
    >
      <Toaster />
      <CertificateForm certId={certId} />

      <div className="flex flex-col items-center justify-center">
        <Suspense fallback={<p></p>}>
          <CertValidate id={certId} />
        </Suspense>
      </div>
    </CheckPageWrapper>
  );
};
