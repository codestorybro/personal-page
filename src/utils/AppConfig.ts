export const AppConfig = {
  name: 'CodeStoryBro',
  locale: 'pl_PL',
  language: 'pl',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://codestorybro.com',
  title: 'CodeStoryBro | IT i technologia - wprost',
  description: 'CodeStoryBro komentuje absurdy, napięcia i patologie świata IT i technologii. AI, vibe coding, Big Tech, ludzie, decyzje i wszystko to, co dzieje się między kodem a biznesem.',
  author: {
    name: 'Marcin Kołodziej',
    jobTitle: 'Engineering Manager, Content Creator, Speaker',
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
