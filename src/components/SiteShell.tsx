import type { ReactNode } from 'react';
import Link from 'next/link';

const focusRing = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#090b0d]';

export function SiteShell({
  children,
  currentSection,
}: {
  children: ReactNode;
  currentSection?: string;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#090b0d] font-bodyText text-white antialiased">
      <div className="personal-site-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[32rem] w-[64rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.055] blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between gap-6 border-b border-white/10 py-6 sm:py-8">
          <Link href="/" className={`rounded-sm no-underline ${focusRing}`} aria-label="CodeStoryBro home">
            <span className="block text-lg font-semibold tracking-[-0.03em] text-white sm:text-xl">CodeStoryBro</span>
            <span className="mt-1 block text-xs text-zinc-500">Marcin Kołodziej</span>
          </Link>
          {currentSection && (
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-zinc-500">
              {currentSection}
            </span>
          )}
        </header>

        <div className="flex-1">{children}</div>

        <footer className="flex flex-col gap-3 border-t border-white/10 py-7 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            ©
            {' '}
            {new Date().getFullYear()}
            {' '}
            CodeStoryBro
          </p>
          <p>Software Development • Engineering Leadership • Public Speaking</p>
        </footer>
      </div>
    </div>
  );
}
