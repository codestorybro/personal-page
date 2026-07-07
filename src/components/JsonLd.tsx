import type { FC } from 'react';
import { AppConfig } from '@/utils/AppConfig';

const SITE_URL = AppConfig.url;
const sameAs = Object.values(AppConfig.social).filter(
  (url: unknown): url is string => typeof url === 'string' && url.length > 0,
);

const personSchema = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  'name': AppConfig.author.name,
  'alternateName': AppConfig.name,
  'url': SITE_URL,
  'image': `${SITE_URL}/assets/img/about/about.webp`,
  'description': 'Engineering Manager i speaker komentujący IT, AI, rynek pracy, rekrutacje i karierę.',
  'sameAs': sameAs,
  'jobTitle': AppConfig.author.jobTitle,
  'knowsAbout': [
    'rynek pracy IT',
    'zwolnienia w IT',
    'rekrutacje IT',
    'rekrutacje widmo',
    'AI w IT',
    'vibe coding',
    'kariera IT',
    'branża technologiczna',
    'engineering management',
    'polskie IT',
  ],
};

const organizationSchema = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  'name': AppConfig.name,
  'url': SITE_URL,
  'logo': {
    '@type': 'ImageObject',
    'url': `${SITE_URL}/assets/img/logo-main.svg`,
  },
  'description': 'Marka osobista Marcina Kołodzieja komentująca IT, AI, rynek pracy, rekrutacje i karierę.',
  'founder': {
    '@id': `${SITE_URL}/#person`,
  },
  'sameAs': sameAs,
  'contactPoint': {
    '@type': 'ContactPoint',
    'email': AppConfig.author.email,
    'contactType': 'business inquiries',
    'availableLanguage': 'Polish',
  },
};

const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  'url': SITE_URL,
  'name': AppConfig.name,
  'description': AppConfig.description,
  'inLanguage': 'pl-PL',
  'publisher': {
    '@id': `${SITE_URL}/#organization`,
  },
};

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

const JsonLd: FC<JsonLdProps> = ({ data }) => {
  const jsonLd = Array.isArray(data)
    ? { '@context': 'https://schema.org', '@graph': data }
    : { '@context': 'https://schema.org', ...data };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export const HomeJsonLd: FC = () => {
  const webPageSchema = {
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    'url': SITE_URL,
    'name': AppConfig.title,
    'description': AppConfig.description,
    'isPartOf': {
      '@id': `${SITE_URL}/#website`,
    },
    'about': {
      '@id': `${SITE_URL}/#person`,
    },
    'mainEntity': {
      '@id': `${SITE_URL}/#person`,
    },
    'inLanguage': 'pl-PL',
  };

  return (
    <JsonLd
      data={[
        websiteSchema,
        webPageSchema,
        organizationSchema,
        personSchema,
      ]}
    />
  );
};

export const BlogListJsonLd: FC = () => {
  const blogUrl = `${SITE_URL}/blog`;

  return (
    <JsonLd
      data={[
        {
          '@type': 'CollectionPage',
          '@id': `${blogUrl}#collection`,
          'name': 'Blog CodeStoryBro | IT, AI i kariera programisty',
          'description': 'Teksty o IT, AI, karierze, pracy programisty i rynku technologicznym.',
          'url': blogUrl,
          'inLanguage': 'pl-PL',
          'isPartOf': {
            '@id': `${SITE_URL}/#website`,
          },
          'mainEntity': {
            '@type': 'Blog',
            'name': 'Blog CodeStoryBro',
            'description': 'Archiwalne i aktualne teksty o IT, AI, karierze, pracy programisty, zespołach i rynku technologicznym.',
            'publisher': {
              '@id': `${SITE_URL}/#organization`,
            },
          },
        },
        websiteSchema,
        organizationSchema,
        personSchema,
      ]}
    />
  );
};

type BlogArticleJsonLdProps = {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  modifiedAt?: string;
  coverImage: string | null;
  tags: string[];
};

export const BlogArticleJsonLd: FC<BlogArticleJsonLdProps> = ({
  title,
  description,
  slug,
  publishedAt,
  modifiedAt,
  coverImage,
  tags,
}) => {
  const articleUrl = `${SITE_URL}/blog/${slug}`;
  const ogImage = coverImage || `${SITE_URL}/assets/img/og-default.png`;

  return (
    <JsonLd
      data={[
        {
          '@type': 'Article',
          '@id': `${articleUrl}#article`,
          'headline': title,
          'description': description,
          'image': {
            '@type': 'ImageObject',
            'url': ogImage,
          },
          'datePublished': publishedAt,
          'dateModified': modifiedAt || publishedAt,
          'author': {
            '@id': `${SITE_URL}/#person`,
          },
          'publisher': {
            '@id': `${SITE_URL}/#organization`,
          },
          'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': articleUrl,
          },
          'keywords': tags.join(', '),
          'articleSection': tags[0] || 'Branża IT od środka',
          'inLanguage': 'pl-PL',
          'isPartOf': {
            '@id': `${SITE_URL}/#website`,
          },
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Strona główna',
              'item': SITE_URL,
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Blog',
              'item': `${SITE_URL}/blog`,
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': title,
              'item': articleUrl,
            },
          ],
        },
        websiteSchema,
        organizationSchema,
        personSchema,
      ]}
    />
  );
};

export default JsonLd;
