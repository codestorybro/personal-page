export type SeoLocale = 'pl' | 'en';
export type SeoSurface = 'home' | 'stage' | 'studio' | 'live' | 'check' | 'missing';
export const brandAssets = {
  image: '/assets/img/og-codestorybro.png',
  logo: '/assets/img/logo-main.svg',
};
export const seoCopy = {
  home: {
    pl: { title: 'CodeStoryBro | Marcin Kołodziej o prowadzeniu zespołów IT', description: 'Prowadzę zespoły inżynierskie i dzielę się doświadczeniem w internecie oraz na konferencjach. Codzienna praca z zespołem, software i komentarze o branży IT.' },
    en: { title: 'CodeStoryBro | Marcin Kołodziej on engineering leadership', description: 'I lead engineering teams and share my experience online and at conferences. The day-to-day work of leading a team, software, and a take on the IT industry.' },
  },
  stage: {
    pl: { title: 'CodeStoryBro Stage | Prezentacje Marcina Kołodzieja', description: 'Prezentacje z wystąpień Marcina Kołodzieja o prowadzeniu zespołów inżynierskich i branży IT. Pobierz materiały i zabierz idee do swojego zespołu.' },
    en: { title: 'CodeStoryBro Stage | Talks by Marcin Kołodziej', description: 'Presentations from Marcin Kołodziej’s talks on engineering leadership and the IT industry. Download the materials and bring ideas to your team.' },
  },
  studio: {
    pl: { title: 'CodeStoryBro Studio | Panel prezentera', description: 'Zarządzanie sesjami prezentacji, pytaniami, wynikami i archiwum CodeStoryBro.' },
    en: { title: 'CodeStoryBro Studio | Presenter panel', description: 'Manage CodeStoryBro presentation sessions, questions, results, and archives.' },
  },
  live: {
    pl: { title: 'CodeStoryBro Live | Głosowanie podczas prezentacji', description: 'Dołącz do sesji CodeStoryBro i odpowiedz na pytania podczas prezentacji.' },
    en: { title: 'CodeStoryBro Live | Presentation voting', description: 'Join a CodeStoryBro session and answer questions during the presentation.' },
  },
  check: {
    pl: { title: 'Weryfikacja certyfikatu | CodeStoryBro', description: 'Sprawdź autentyczność certyfikatu CodeStoryBro za pomocą jego identyfikatora.' },
    en: { title: 'Certificate verification | CodeStoryBro', description: 'Check the authenticity of a CodeStoryBro certificate using its certificate ID.' },
  },
  missing: {
    pl: { title: 'Nie znaleziono strony | CodeStoryBro', description: 'Ta strona nie istnieje. Wróć do CodeStoryBro.' },
    en: { title: 'Page not found | CodeStoryBro', description: 'This page does not exist. Return to CodeStoryBro.' },
  },
} as const;
export const seoLocale = (value: unknown): SeoLocale => value === 'en' ? 'en' : 'pl';
export function seoSurface(site: 'home' | 'stage', path: string): SeoSurface {
  if (site === 'home') {
    if (path === '/' || path === '/linktree.html') {
      return 'home';
    }
    if (path === '/check') {
      return 'check';
    }
  } else {
    if (path === '/') {
      return 'stage';
    }
    if (/^\/presenter\/[^/]+\/screen\/?$/.test(path) || path.startsWith('/s/')) {
      return 'live';
    }
    if (path === '/presenter' || path.startsWith('/presenter/')) {
      return 'studio';
    }
  }
  return 'missing';
}
export function languageUrl(base: string, locale: SeoLocale, path = '/') {
  const url = new URL(path, base);
  if (locale === 'en') {
    url.searchParams.set('lang', 'en');
  }
  return url.href;
}
