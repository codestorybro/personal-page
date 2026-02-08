import { FAQSection, HeroSection } from '@/components/AnimatedSections';
import { HomeJsonLd } from '@/components/JsonLd';
import { WhoIsSection } from '@/components/WhoIsSection';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type IIndexProps = {
  params: Promise<{ locale: string }>;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://codestorybro.com';

export async function generateMetadata(props: IIndexProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'OG',
  });

  const canonicalUrl = `${SITE_URL}/${locale}`;

  return {
    title: t('title'),
    description: t('desc'),
    keywords: [
      'React',
      'JavaScript',
      'TypeScript',
      'programowanie',
      'software development',
      'engineering manager',
      'CodeStoryBro',
    ],
    authors: [{ name: 'Marcin Kołodziej', url: SITE_URL }],
    creator: 'Marcin Kołodziej',
    publisher: 'CodeStoryBro',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        pl: `${SITE_URL}/pl`,
        en: `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('desc'),
      url: canonicalUrl,
      siteName: 'CodeStoryBro',
      type: 'website',
      locale,
      images: [
        {
          url: `${SITE_URL}/assets/img/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'CodeStoryBro',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@codestorybro',
      creator: '@codestorybro',
      title: t('title'),
      description: t('desc'),
      images: [`${SITE_URL}/assets/img/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        'index': true,
        'follow': true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function Index(props: IIndexProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'Home',
  });

  const heroTranslations = {
    sometimes_code_works: t('sometimes_code_works'),
    lets_talk_about_it: t('lets_talk_about_it'),
    loose_stories: t('loose_stories'),
    check_my_work: t('check_my_work'),
  };

  const faqTranslations = {
    q1: t('q1'),
    a1: t('a1'),
    q2: t('q2'),
    a2: t('a2'),
    q3: t('q3'),
    a3: t('a3'),
  };

  const tWhoIs = await getTranslations({
    locale,
    namespace: 'WhoIs',
  });

  const whoIsTranslations = {
    title: tWhoIs('title'),
    intro_1: tWhoIs('intro_1'),
    intro_2: tWhoIs('intro_2'),
    experience_1: tWhoIs('experience_1'),
    experience_2: tWhoIs('experience_2'),
    today_intro: tWhoIs('today_intro'),
    today_code: tWhoIs('today_code'),
    today_people: tWhoIs('today_people'),
    today_lessons: tWhoIs('today_lessons'),
    summary_1: tWhoIs('summary_1'),
    summary_2: tWhoIs('summary_2'),
    collab_title: tWhoIs('collab_title'),
    collab_intro: tWhoIs('collab_intro'),
    collab_open: tWhoIs('collab_open'),
    collab_conferences: tWhoIs('collab_conferences'),
    collab_podcasts: tWhoIs('collab_podcasts'),
    collab_education: tWhoIs('collab_education'),
    collab_outro_1: tWhoIs('collab_outro_1'),
    collab_outro_2: tWhoIs('collab_outro_2'),
  };

  return (
    <>
      <HomeJsonLd />
      <HeroSection translations={heroTranslations} />
      <WhoIsSection translations={whoIsTranslations} />
      <FAQSection translations={faqTranslations} />
    </>
  );
};
