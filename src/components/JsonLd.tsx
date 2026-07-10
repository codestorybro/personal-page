import type { BlogPost } from '@/libs/notion';
import type { FC } from 'react';
import { AppConfig } from '@/utils/AppConfig';
import { blogPostImageUrl, blogPostUrl } from '@/utils/BlogSeo';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${AppConfig.url}/#person`,
  'name': AppConfig.author.name,
  'alternateName': AppConfig.name,
  'url': AppConfig.url,
  'image': `${AppConfig.url}/assets/img/about/about.webp`,
  'email': AppConfig.author.email,
  'jobTitle': AppConfig.author.jobTitle,
  'description': AppConfig.openGraphDescription,
  'sameAs': [
    AppConfig.social.x,
    AppConfig.social.linkedin,
  ],
  'knowsAbout': [
    'Software development',
    'Software engineering',
    'Engineering management',
    'Technical leadership',
    'Engineering leadership',
    'Conference speaking',
  ],
};

export const HomeJsonLd: FC = () => {
  return <JsonLd data={personSchema} />;
};

function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const schema = Array.isArray(data)
    ? { '@context': 'https://schema.org', '@graph': data }
    : data;
  const serializedSchema = JSON.stringify(schema).replace(/</g, '\\u003c');

  return (
    // JSON-LD must be emitted as a raw script payload. Its static values are escaped above.
    // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializedSchema }}
    />
  );
}

export const BlogArchiveJsonLd: FC<{ posts: BlogPost[] }> = ({ posts }) => {
  const archiveUrl = `${AppConfig.url}/blog`;
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${archiveUrl}#collection`,
        'url': archiveUrl,
        'name': 'Publication Archive | CodeStoryBro',
        'description': 'Archived articles by CodeStoryBro about software development, engineering leadership, technology, and the software industry.',
        'isPartOf': { '@id': `${AppConfig.url}/#website` },
        'mainEntity': {
          '@type': 'ItemList',
          'itemListElement': posts.map((post, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'url': blogPostUrl(post.slug),
            'name': post.title,
          })),
        },
      }}
    />
  );
};

export const BlogArticleJsonLd: FC<{
  post: BlogPost;
  description: string;
}> = ({ post, description }) => {
  const articleUrl = blogPostUrl(post.slug);
  const article: Record<string, unknown> = {
    '@type': 'BlogPosting',
    '@id': `${articleUrl}#article`,
    'headline': post.title,
    'description': description,
    'datePublished': post.publishedAt,
    'image': blogPostImageUrl(post),
    'author': {
      '@type': 'Person',
      '@id': `${AppConfig.url}/#person`,
      'name': AppConfig.author.name,
      'url': AppConfig.url,
    },
    'publisher': {
      '@type': 'Organization',
      'name': AppConfig.name,
      'url': AppConfig.url,
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    'url': articleUrl,
  };

  if (post.modifiedAt) {
    article.dateModified = post.modifiedAt;
  }

  return (
    <JsonLd
      data={[
        article,
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'CodeStoryBro',
              'item': AppConfig.url,
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Publication Archive',
              'item': `${AppConfig.url}/blog`,
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': post.title,
              'item': articleUrl,
            },
          ],
        },
      ]}
    />
  );
};
