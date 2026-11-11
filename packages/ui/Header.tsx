'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useLocale } from './Locale';

export function useAppLinks(stageOverride?: string, homeOverride?: string) {
  const [local, setLocal] = useState(false);
  useEffect(() => {
    setLocal(['localhost', '127.0.0.1', '[::1]'].includes(location.hostname));
  }, []);
  return {
    stage:
      stageOverride
      || (local ? 'http://127.0.0.1:8787' : 'https://stage.codestorybro.com'),
    home:
      homeOverride
      || (local ? 'http://127.0.0.1:3000' : 'https://www.codestorybro.com'),
  };
}
export function Header({
  variant,
  brandUrl,
  stageUrl,
  children,
  className = '',
}: {
  variant: 'Home' | 'Stage' | 'Studio' | 'Live';
  brandUrl: string;
  stageUrl: string;
  children?: ReactNode;
  className?: string;
}) {
  const { pick, link } = useLocale();
  return (
    <header className={`csb-header ${className}`}>
      <a className="csb-brand" href={link(variant === 'Home' || variant === 'Stage' ? brandUrl : stageUrl)}>
        <span className="link-label">CodeStoryBro</span>
        <span className="csb-badge">{variant}</span>
      </a>
      {variant !== 'Studio' && (
        <nav aria-label={pick('Main navigation', 'Nawigacja główna')}>
          {variant !== 'Live' && (
            <a href={link(stageUrl)}>
              <span className="link-label">
                {pick('Presentations', 'Prezentacje')}
              </span>
            </a>
          )}
          <a
            href="https://www.youtube.com/@codestorybro"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="link-label">YouTube</span>
          </a>
        </nav>
      )}
      {children}
    </header>
  );
}
