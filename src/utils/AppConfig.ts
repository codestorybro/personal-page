export const AppConfig = {
  name: 'CodeStoryBro',
  locale: 'pl_PL',
  language: 'pl',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://codestorybro.com',
  title: 'CodeStoryBro | Najtrudniejsze w IT rzadko jest techniczne',
  description: 'Marcin Kołodziej, Engineering Manager, mówi o zarządzaniu zespołami IT, trudnych rozmowach, feedbacku, odpowiedzialności i karierze w technologii.',
  author: {
    name: 'Marcin Kołodziej',
    jobTitle: 'Engineering Manager',
    email: 'hello@codestorybro.com',
  },
  social: {
    linkedin: 'https://linkedin.com/in/codestorybro',
    youtube: 'https://youtube.com/@codestorybro',
    instagram: 'https://www.instagram.com/codestorybro/',
    threads: 'https://www.threads.com/@codestorybro',
  },
} as const;
