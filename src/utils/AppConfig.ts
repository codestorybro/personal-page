export const AppConfig = {
  name: 'CodeStoryBro',
  locale: 'pl_PL',
  language: 'pl',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://codestorybro.com',
  title: 'CodeStoryBro | IT, AI i kariera programisty',
  description: 'Komentarze o polskim IT, AI, zwolnieniach, rekrutacjach, vibe codingu i tym, jak zmienia się praca programisty.',
  openGraphDescription: 'IT nie umarło. Skończyła się era łatwego wejścia i przeciętności. Komentarze o rynku IT, AI, rekrutacjach i pracy programisty.',
  twitterDescription: 'IT nie umarło. Skończyła się era łatwego wejścia i przeciętności. Komentarze o rynku IT, AI, rekrutacjach i pracy programisty.',
  ogImageAlt: 'CodeStoryBro — komentarz o polskim IT, AI, zwolnieniach i vibe codingu',
  author: {
    name: 'Marcin Kołodziej',
    jobTitle: 'Engineering Manager, Speaker',
    email: 'hello@codestorybro.com',
  },
  social: {
    linkedin: 'https://www.linkedin.com/in/codestorybro',
    youtube: 'https://www.youtube.com/@codestorybro',
    instagram: 'https://www.instagram.com/codestorybro',
    threads: 'https://www.threads.com/@codestorybro',
    discord: 'https://discord.com/invite/Fn2WTPfCkR',
  },
} as const;
