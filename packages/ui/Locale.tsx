'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translate } from './translations';

export type Locale = 'en' | 'pl';
const key = 'codestorybro-language';
const valid = (value: string | null): value is Locale =>
  value === 'en' || value === 'pl';
const defaults = {
  locale: 'pl' as Locale,
  setLocale: (_locale: Locale) => {},
  t: (text: string) => translate('pl', text),
  pick: (_en: string, pl: string) => pl,
  link: (url: string) => url,
};
const LocaleContext = createContext(defaults);
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, update] = useState<Locale>('pl');
  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get('lang');
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(key);
    } catch {
      /* Storage can be disabled. */
    }
    const next = valid(query) ? query : valid(saved) ? saved : 'pl';
    update(next);
    if (valid(query)) {
      try {
        localStorage.setItem(key, query);
      } catch {
        /* Keep an in-memory preference. */
      }
    }
    const sync = (event: StorageEvent) => {
      if (event.key === key && valid(event.newValue)) {
        update(event.newValue);
        const url = new URL(window.location.href);
        url.searchParams.set('lang', event.newValue);
        window.history.replaceState(window.history.state, '', url);
      }
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  const value = useMemo(
    () => ({
      locale,
      setLocale: (next: Locale) => {
        update(next);
        try {
          localStorage.setItem(key, next);
        } catch {
          /* Keep an in-memory preference. */
        }
        const url = new URL(window.location.href);
        url.searchParams.set('lang', next);
        window.history.replaceState(window.history.state, '', url);
      },
      t: (text: string) => translate(locale, text),
      pick: (en: string, pl: string) => (locale === 'en' ? en : pl),
      link: (url: string) => {
        const [path, hash] = url.split('#');
        return `${path}${path?.includes('?') ? '&' : '?'}lang=${locale}${hash ? `#${hash}` : ''}`;
      },
    }),
    [locale],
  );
  return <LocaleContext value={value}>{children}</LocaleContext>;
}
export const useLocale = () => useContext(LocaleContext);
