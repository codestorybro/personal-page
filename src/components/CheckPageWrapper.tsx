import type { FC, ReactNode } from 'react';
import { SiteShell } from '@/components/SiteShell';

type Props = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
};

export const CheckPageWrapper: FC<Props> = ({ title, subtitle, children }) => {
  return (
    <SiteShell currentSection="Certificate verification">
      <div className="mx-auto w-full max-w-2xl py-14 sm:py-24">
        <header className="mb-8 border-b border-rule pb-8">
          <p className="eyebrow text-accent-strong">Utility</p>
          <h1 className="display-title mt-5">{title}</h1>
          <p className="mt-4 leading-7 text-muted">{subtitle}</p>
        </header>
        {children}
      </div>
    </SiteShell>
  );
};
