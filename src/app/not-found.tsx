'use client';

import { SiteShell } from '@/components/SiteShell';
import Link from 'next/link';
import { useLocale } from '../../packages/ui/Locale';

export default function NotFound() {
  const { pick } = useLocale();
  return (
    <SiteShell>
      <div className="mx-auto max-w-2xl py-20 sm:py-28">
        <p className="eyebrow text-accent-strong">404</p>
        <h1 className="display-title mt-5">{pick('This page does not exist.', 'Ta strona nie istnieje.')}</h1>
        <p className="mt-5 leading-7 text-muted">{pick('The link may be outdated, or the page may have moved.', 'Link może być nieaktualny lub strona została przeniesiona.')}</p>
        <Link href="/" className="text-action mt-5">
          <span aria-hidden="true">←</span>
          <span className="link-label">{pick('Back to CodeStoryBro', 'Wróć do CodeStoryBro')}</span>
        </Link>
      </div>
    </SiteShell>
  );
}
