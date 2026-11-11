import { seoCopy } from '../../packages/seo/content';

const productionUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.codestorybro.com').replace(/\/+$/u, '');

export const AppConfig = {
  name: 'CodeStoryBro',
  locale: 'pl_PL',
  language: 'pl',
  url: productionUrl,
  title: seoCopy.home.pl.title,
  description: seoCopy.home.pl.description,
  openGraphTitle: seoCopy.home.pl.title,
  openGraphDescription: seoCopy.home.pl.description,
  twitterTitle: seoCopy.home.pl.title,
  twitterDescription: seoCopy.home.pl.description,
  ogImageAlt: 'CodeStoryBro',
  author: {
    name: 'Marcin Kołodziej',
    jobTitle: 'Engineering Manager',
    email: 'hello@codestorybro.com',
  },
  social: {
    youtube: 'https://www.youtube.com/@codestorybro',
    linkedin: 'https://www.linkedin.com/in/codestorybro',
  },
} as const;
