'use client';

import type { FC, ReactNode } from 'react';
import { SiteShell } from '@/components/SiteShell';
import { useLocale } from '../../packages/ui/Locale';

type Props = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
};

export const CheckPageWrapper: FC<Props> = ({ children }) => {
  const { pick } = useLocale();
  return (
    <SiteShell currentSection={pick('Certificate verification', 'Weryfikacja certyfikatu')}>
      <div className="mx-auto w-full max-w-2xl py-14 sm:py-24">
        <header className="mb-8 border-b border-rule pb-8">
          <p className="eyebrow text-accent-strong">{pick('Utility', 'Narzędzia')}</p>
          <h1 className="display-title mt-5">{pick('Verify a certificate', 'Sprawdź certyfikat')}</h1>
          <p className="mt-4 leading-7 text-muted">{pick('Enter the certificate ID to confirm its authenticity', 'Wpisz identyfikator certyfikatu, aby potwierdzić jego autentyczność')}</p>
        </header>
        {children}
      </div>
    </SiteShell>
  );
};
