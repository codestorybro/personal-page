import type { ReactNode } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { AppConfig } from '@/utils/AppConfig';
import Link from 'next/link';
import { Footer } from '../../packages/ui/Footer';

export function SiteShell({ children, currentSection }: {
  children: ReactNode;
  currentSection?: string;
}) {
  return (
    <div className="site-frame">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-rule py-5 sm:py-7">
        <Link href="/" className="flex min-h-11 items-center gap-3" aria-label="CodeStoryBro home">
          <svg className="size-9 shrink-0 text-accent" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M8 1.5h20c3.7 0 6.5 2.9 6.5 6.5v20c0 3.7-2.9 6.5-6.5 6.5H8c-3.7 0-6.5-2.9-6.5-6.5V8c0-3.7 2.9-6.5 6.5-6.5Z" />
            <path d="m13 13-5 5 5 5m10-10 5 5-5 5m-3-13-4 16" />
          </svg>
          <span>
            <span className="block text-sm font-semibold text-ink">CodeStoryBro</span>
            <span className="block text-xs text-muted">Marcin Kołodziej</span>
          </span>
        </Link>
        {currentSection
          ? <span className="eyebrow text-muted">{currentSection}</span>
          : (
              <nav aria-label="Primary">
                <a href={AppConfig.social.youtube} className="text-action" target="_blank" rel="noopener noreferrer">
                  <span className="link-label">YouTube</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </nav>
            )}
      </header>

      <main id="main-content" tabIndex={-1} className="min-w-0 flex-1">{children}</main>

      <ScrollReveal />

      <Footer />
    </div>
  );
}
