'use client';

import type { ReactNode } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Footer } from '../../packages/ui/Footer';
import { Header, useAppLinks } from '../../packages/ui/Header';
import { useLocale } from '../../packages/ui/Locale';

export function SiteShell({ children }: { children: ReactNode; currentSection?: string }) {
  const { pick } = useLocale();
  const { stage } = useAppLinks(process.env.NEXT_PUBLIC_STAGE_URL);
  return (
    <div className="site-frame">
      <a href="#main-content" className="skip-link">{pick('Skip to content', 'Przejdź do treści')}</a>
      <Header variant="Home" brandUrl="/" stageUrl={stage} />
      <main id="main-content" tabIndex={-1} className="min-w-0 flex-1">{children}</main>
      <ScrollReveal />
      <Footer />
    </div>
  );
}
