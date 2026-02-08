import CertificateForm from '@/components/CertificateForm';
import CertValidate from '@/components/CertValidate';
import { CheckPageWrapper } from '@/components/CheckPageWrapper';
import { Suspense } from 'react';

export async function generateMetadata() {
  return {
    title: 'CodeStoryBro',
    description: 'CodeStoryBro to merytoryka i społeczność, która rozumie Twój programistyczny ból. Dołącz i rozwijaj swoje umiejętności!',
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
