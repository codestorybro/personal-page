const productionUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.codestorybro.com').replace(/\/+$/u, '');

export const AppConfig = {
  name: 'CodeStoryBro',
  locale: 'en_US',
  language: 'en',
  url: productionUrl,
  title: 'CodeStoryBro | Software Developer & Engineering Manager',
  description: 'Personal website of CodeStoryBro — software developer, engineering manager, and conference speaker sharing experience in software engineering, technology, and technical leadership.',
  openGraphTitle: 'CodeStoryBro | Software Developer & Engineering Manager',
  openGraphDescription: 'Software developer, engineering manager, and conference speaker with over\u00A0a decade of experience in the technology industry.',
  twitterTitle: 'CodeStoryBro | Software Developer & Engineering Manager',
  twitterDescription: 'Software development, engineering leadership, technology, and conference speaking.',
  ogImageAlt: 'CodeStoryBro — Software Developer, Engineering Manager and Conference Speaker',
  author: {
    name: 'Marcin Kołodziej',
    jobTitle: 'Software Developer, Engineering Manager and Conference Speaker',
    email: 'hello@codestorybro.com',
  },
  social: {
    x: 'https://x.com/codestorybro',
    linkedin: 'https://www.linkedin.com/in/codestorybro',
  },
} as const;
