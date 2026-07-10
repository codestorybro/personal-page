import type { FC } from 'react';
import { AppConfig } from '@/utils/AppConfig';

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
  const serializedSchema = JSON.stringify(personSchema).replace(/</g, '\\u003c');

  return (
    // JSON-LD must be emitted as a raw script payload. Its static values are escaped above.
    // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializedSchema }}
    />
  );
};
