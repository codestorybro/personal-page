import type { FC } from 'react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://codestorybro.com';

// Base Person schema used across the site
const personSchema = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  'name': 'Marcin Kołodziej',
  'alternateName': 'CodeStoryBro',
  'url': SITE_URL,
  'image': `${SITE_URL}/assets/img/marcin.jpg`,
  'sameAs': [
    'https://twitter.com/codestorybro',
    'https://linkedin.com/in/codestorybro',
    'https://github.com/codestorybro',
    'https://youtube.com/@codestorybro',
    'https://instagram.com/codestorybro',
    'https://discord.gg/7VNpaBGCNr',
  ],
  'jobTitle': 'Software Engineer & Engineering Manager',
};

// Base Website schema
const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  'url': SITE_URL,
  'name': 'CodeStoryBro',
  'description': 'Historie o tworzeniu oprogramowania, budowaniu produktów i prowadzeniu zespołów',
  'inLanguage': 'pl-PL',
  'publisher': {
    '@id': `${SITE_URL}/#person`,
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

// Home page JSON-LD
export const HomeJsonLd: FC = () => {
  return (
    <JsonLd
      data={[
        websiteSchema,
        personSchema,
      ]}
    />
  );
};

// Blog list page JSON-LD
export const BlogListJsonLd: FC = () => {
  const blogUrl = `${SITE_URL}/blog`;

  return (
    <JsonLd
      data={[
        {
          '@type': 'CollectionPage',
          '@id': `${blogUrl}#collection`,
          'name': 'Blog – CodeStoryBro',
          'description': 'Myśli, spostrzeżenia i doświadczenia z mojej podróży',
          'url': blogUrl,
          'inLanguage': 'pl-PL',
          'isPartOf': {
            '@id': `${SITE_URL}/#website`,
          },
          'mainEntity': {
            '@type': 'Blog',
            'name': 'CodeStoryBro Blog',
            'description': 'Artykuły o inżynierii oprogramowania, zarządzaniu zespołami i budowaniu produktów',
          },
        },
        websiteSchema,
        personSchema,
      ]}
    />
  );
};

// Blog article JSON-LD
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
            'width': 1200,
            'height': 630,
          },
          'datePublished': publishedAt,
          'dateModified': modifiedAt || publishedAt,
          'author': {
            '@id': `${SITE_URL}/#person`,
          },
          'publisher': {
            '@id': `${SITE_URL}/#person`,
          },
          'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': articleUrl,
          },
          'keywords': tags.join(', '),
          'articleSection': tags[0] || 'Blog',
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
        personSchema,
      ]}
    />
  );
};

export default JsonLd;
