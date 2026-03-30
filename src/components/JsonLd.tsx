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
  'description': 'Mówię głośno to, co połowa branży IT myśli po cichu. O wypaleniu, utracie sensu i fake\'owych pseudo-sukcesach.',
  'sameAs': [
    'https://linkedin.com/in/codestorybro',
    'https://youtube.com/@codestorybro',
  ],
  'jobTitle': 'Keynote Speaker & Creator',
  'knowsAbout': [
    'Wypalenie w IT',
    'Sens pracy w tech',
    'Keynote speaking',
    'Personal branding w IT',
    'Wartość programisty',
    'Kultura pracy w IT',
  ],
};

// Organization schema
const organizationSchema = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  'name': 'CodeStoryBro',
  'url': SITE_URL,
  'logo': {
    '@type': 'ImageObject',
    'url': `${SITE_URL}/assets/img/logo-main.svg`,
  },
  'description': 'Mówię głośno to, co połowa branży IT myśli po cichu.',
  'founder': {
    '@id': `${SITE_URL}/#person`,
  },
  'sameAs': [
    'https://linkedin.com/in/codestorybro',
    'https://youtube.com/@codestorybro',
  ],
  'contactPoint': {
    '@type': 'ContactPoint',
    'email': 'hello@codestorybro.com',
    'contactType': 'customer service',
    'availableLanguage': 'Polish',
  },
};

// Base Website schema
const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  'url': SITE_URL,
  'name': 'CodeStoryBro',
  'description': 'Mówię głośno to, co połowa branży IT myśli po cichu.',
  'inLanguage': 'pl-PL',
  'publisher': {
    '@id': `${SITE_URL}/#organization`,
  },
  'potentialAction': {
    '@type': 'SearchAction',
    'target': `${SITE_URL}/blog?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
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
  const webPageSchema = {
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    'url': SITE_URL,
    'name': 'CodeStoryBro | Mówię głośno o IT to, co większość branży myśli po cichu',
    'description': 'Przestań czuć się jak code monkey. Odzyskaj sens, energię i\u00A0kierunek w\u00A0świecie pełnym korpo-ściemy, przebodźcowania pseudo-sukcesami i\u00A0AI.',
    'isPartOf': {
      '@id': `${SITE_URL}/#website`,
    },
    'about': {
      '@id': `${SITE_URL}/#organization`,
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
          'description': 'Bez filtra o IT, wypaleniu i tym, co naprawdę ma znaczenie. Surowe, szczere teksty. Zero korpo-bełkotu.',
          'url': blogUrl,
          'inLanguage': 'pl-PL',
          'isPartOf': {
            '@id': `${SITE_URL}/#website`,
          },
          'mainEntity': {
            '@type': 'Blog',
            'name': 'CodeStoryBro Blog',
            'description': 'Surowe teksty o branży IT — wypalenie, utrata sensu, kariera bez autopilota, fake\'owy LinkedIn pełen pseudo-sukcesów i AI jako katalizator zmiany.',
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
