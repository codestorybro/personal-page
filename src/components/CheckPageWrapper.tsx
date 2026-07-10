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
      <main className="mx-auto flex min-h-[70vh] w-full max-w-2xl flex-col justify-center py-14 sm:py-20">
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-10">
          <header className="mb-8 border-b border-white/10 pb-8">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">Utility</p>
            <h1 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">{title}</h1>
            <p className="mt-3 leading-7 text-zinc-400">{subtitle}</p>
          </header>
          {children}
        </div>
      </main>
    </SiteShell>
  );
};
