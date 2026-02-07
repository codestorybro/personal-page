import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import CertificateForm from '@/components/CertificateForm';
import CertValidate from '@/components/CertValidate';
import { CheckPageWrapper } from '@/components/CheckPageWrapper';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'OG',
  });

  return {
    title: t('title'),
    description: t('desc'),
  };
}

type Props = {
  searchParams: Promise<{ certId?: string }>;
};

export default async function Check({ searchParams }: Props) {
  const { certId } = await searchParams;
  const t = await getTranslations('General');

  return (
    <CheckPageWrapper
      title={t('certificate_check')}
      subtitle={t('certificate_check_subtitle')}
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
