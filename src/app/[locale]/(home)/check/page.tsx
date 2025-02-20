import CertificateForm from '@/components/CertificateForm';
import CertValidate from '@/components/CertValidate';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

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

  return (
    <>
      <CertificateForm certId={certId} />

      <div className="flex flex-col items-center justify-center">
        <Suspense fallback={<p></p>}>
          <CertValidate id={certId} />
        </Suspense>
      </div>

    </>
  );
};
