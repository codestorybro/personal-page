const productionUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.codestorybro.com').replace(/\/+$/u, '');

export const AppConfig = {
  name: 'CodeStoryBro',
  locale: 'en_US',
  language: 'en',
  url: productionUrl,
  title: 'CodeStoryBro | The human side of engineering leadership',
  description: 'Engineering leadership with care, candor, and technical depth. Marcin Kołodziej on feedback, trust, and the conversations that help teams build better software.',
  openGraphTitle: 'CodeStoryBro | The human side of engineering leadership',
  openGraphDescription: 'The human side of engineering: honest feedback, trust, and technical decisions. Talks and practical perspectives from Marcin Kołodziej.',
  twitterTitle: 'CodeStoryBro | The human side of engineering leadership',
  twitterDescription: 'Care for people. Speak with candor. Build better software together.',
  ogImageAlt: 'CodeStoryBro — Software Developer, Engineering Manager and Conference Speaker',
  author: {
    name: 'Marcin Kołodziej',
    jobTitle: 'Software Developer, Engineering Manager and Conference Speaker',
    email: 'hello@codestorybro.com',
  },
  social: {
    youtube: 'https://www.youtube.com/@codestorybro',
    linkedin: 'https://www.linkedin.com/in/codestorybro',
  },
} as const;
