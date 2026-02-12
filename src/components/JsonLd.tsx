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
  'description': 'Engineering Manager, mentor i prelegent. Pomagam developerom przejść do ról managerskich.',
  'sameAs': [
    'https://twitter.com/codestorybro',
    'https://linkedin.com/in/codestorybro',
    'https://github.com/codestorybro',
    'https://youtube.com/@codestorybro',
    'https://instagram.com/codestorybro',
    'https://discord.gg/7VNpaBGCNr',
  ],
  'jobTitle': 'Engineering Manager & Leadership Mentor',
  'knowsAbout': [
    'Engineering Management',
    'Leadership w IT',
    'Rozwój kariery programisty',
    'Tech Lead',
    'Delegowanie',
    'Feedback',
    'Zarządzanie zespołami technicznymi',
  ],
};

// Organization schema
const organizationSchema = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  'name': 'CodeStoryBro',
  'alternateName': 'CodeStoryBro Academy',
  'url': SITE_URL,
  'logo': {
    '@type': 'ImageObject',
    'url': `${SITE_URL}/assets/img/logo-main.svg`,
  },
  'description': 'Mentoring, programy grupowe i warsztaty dla dla przyszłych Engineering Managerów',
  'founder': {
    '@id': `${SITE_URL}/#person`,
  },
  'sameAs': [
    'https://twitter.com/codestorybro',
    'https://linkedin.com/in/codestorybro',
    'https://youtube.com/@codestorybro',
    'https://instagram.com/codestorybro',
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
  'description': 'Mentoring, programy grupowe i warsztaty dla dla przyszłych Engineering Managerów',
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
    'name': 'CodeStoryBro | Od developera do Engineering Managera',
    'description': 'Pomagam developerom przejść do ról managerskich. Mentoring 1:1, program grupowy i warsztaty.',
    'isPartOf': {
      '@id': `${SITE_URL}/#website`,
    },
    'about': {
      '@id': `${SITE_URL}/#organization`,
    },
    'inLanguage': 'pl-PL',
  };

  const educationalOrganizationSchema = {
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}/#school`,
    'name': 'CodeStoryBro Academy',
    'description': 'Przestrzeń dla przyszłych i obecnych Engineering Managerów',
    'url': SITE_URL,
    'sameAs': [
      'https://linkedin.com/in/codestorybro',
    ],
    'founder': {
      '@id': `${SITE_URL}/#person`,
    },
    'areaServed': {
      '@type': 'Country',
      'name': 'Poland',
    },
    'knowsAbout': [
      'Engineering Management',
      'Leadership w IT',
      'Rozwój kariery programisty',
      'Tech Lead',
      'Delegowanie',
      'Feedback',
      'Zarządzanie zespołami technicznymi',
    ],
  };

  return (
    <JsonLd
      data={[
        websiteSchema,
        webPageSchema,
        organizationSchema,
        educationalOrganizationSchema,
        personSchema,
      ]}
    />
  );
};

// Oferta page JSON-LD
export const OfertaJsonLd: FC = () => {
  const ofertaUrl = `${SITE_URL}/oferta`;

  const webPageSchema = {
    '@type': 'WebPage',
    '@id': `${ofertaUrl}#webpage`,
    'url': ofertaUrl,
    'name': 'Oferta | Mentoring i szkolenia dla developerów | CodeStoryBro',
    'description': 'Mentoring 1:1, program grupowy CodeStoryBro Academy i warsztaty dla firm. Przejdź z roli technicznej do Engineering Managera.',
    'isPartOf': {
      '@id': `${SITE_URL}/#website`,
    },
    'inLanguage': 'pl-PL',
  };

  const mentoringServiceSchema = {
    '@type': 'Service',
    '@id': `${ofertaUrl}#mentoring`,
    'name': 'Mentoring 1:1 dla developerów oraz obecnych managerów',
    'description': 'Indywidualna praca nad rozwojem kompetencji managerskich. Regularne spotkania, analiza wyzwań i budowanie umiejętności przywódczych.',
    'provider': {
      '@id': `${SITE_URL}/#organization`,
    },
    'serviceType': 'Mentoring',
    'areaServed': {
      '@type': 'Country',
      'name': 'Poland',
    },
    'audience': {
      '@type': 'Audience',
      'audienceType': 'Developers, Tech Leads, Engineering Managers',
    },
    'offers': {
      '@type': 'Offer',
      'availability': 'https://schema.org/InStock',
      'priceCurrency': 'PLN',
    },
  };

  const academyServiceSchema = {
    '@type': 'Course',
    '@id': `${ofertaUrl}#academy`,
    'name': 'CodeStoryBro Academy – Developer to Manager',
    'description': 'Program grupowy dla developerów przechodzących do ról managerskich.',
    'provider': {
      '@id': `${SITE_URL}/#organization`,
    },
    'courseMode': 'online',
    'educationalLevel': 'Professional',
    'timeRequired': 'P12W',
    'inLanguage': 'pl-PL',
    'teaches': [
      'Engineering Management',
      'Leadership',
      'Komunikacja',
      'Delegowanie',
      'Feedback',
    ],
  };

  const workshopServiceSchema = {
    '@type': 'Service',
    '@id': `${ofertaUrl}#warsztaty`,
    'name': 'Warsztaty dla organizacji',
    'description': 'Dedykowane szkolenia i warsztaty dla zespołów IT. Rozwijam kompetencje managerskie i przywódcze u developerów, oraz Tech Leadów.',
    'provider': {
      '@id': `${SITE_URL}/#organization`,
    },
    'serviceType': 'Corporate Training',
    'areaServed': {
      '@type': 'Country',
      'name': 'Poland',
    },
  };

  const speakingServiceSchema = {
    '@type': 'Service',
    '@id': `${ofertaUrl}#speaking`,
    'name': 'Wystąpienia konferencyjne',
    'description': 'Prezentacje, keynote\'y i warsztaty na konferencjach IT, meetupach i wydarzeniach firmowych.',
    'provider': {
      '@id': `${SITE_URL}/#person`,
    },
    'serviceType': 'Speaking',
  };

  const breadcrumbSchema = {
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
        'name': 'Oferta',
        'item': ofertaUrl,
      },
    ],
  };

  return (
    <JsonLd
      data={[
        websiteSchema,
        webPageSchema,
        breadcrumbSchema,
        mentoringServiceSchema,
        academyServiceSchema,
        workshopServiceSchema,
        speakingServiceSchema,
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
