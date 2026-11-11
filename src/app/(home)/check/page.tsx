import type { Metadata } from 'next';

import CertificateForm from '@/components/CertificateForm';
import CertValidate from '@/components/CertValidate';
import { CheckPageWrapper } from '@/components/CheckPageWrapper';
import { pageMetadata } from '@/utils/Metadata';
import { seoLocale } from '../../../../packages/seo/content';

type Props = { searchParams: Promise<{ certId?: string; lang?: string }> };
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  return pageMetadata('check', seoLocale((await searchParams).lang));
}

export default async function Check({ searchParams }: Props) {
  const { certId } = await searchParams;

  return (
    <CheckPageWrapper
      title="Verify a certificate"
      subtitle="Enter the certificate ID to confirm its authenticity"
    >
      <CertificateForm certId={certId} />

      <CertValidate id={certId} />
    </CheckPageWrapper>
  );
};
