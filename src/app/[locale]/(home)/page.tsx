import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AnimatedPrinciples } from '@/components/AnimatedPrinciples';
import { AboutSection, FAQSection, HeroSection } from '@/components/AnimatedSections';

type IIndexProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IIndexProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'OG',
  });

  return {
    title: t('title'),
    description: t('desc'),
    keywords: ['React', 'JavaScript', 'TypeScript'],
    authors: [{ name: 'Marcin Kołodziej' }],
    creator: 'CodeStoryBro',
    publisher: 'Marcin Kołodziej',
    openGraph: {
      title: t('title'),
      description: t('desc'),
      url: `https://codestorybro.com`,
      siteName: 'CodeStoryBro',
      type: 'website',
      locale,
      images: {
        url: 'https://www.codestorybro.com/assets/img/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CodeStoryBro',
      },
    },
    twitter: {
      card: 'summary_large_image',
      site: '@codestorybro',
      creator: '@codestorybro',
      title: t('title'),
      description: t('desc'),
      images: {
        url: 'https://www.codestorybro.com/assets/img/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CodeStoryBro',
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
    join_community: t('join_community'),
  };

  const aboutTranslations = {
    learn_with_fun: t('learn_with_fun'),
    about: t('about'),
  };

  const faqTranslations = {
    q1: t('q1'),
    a1: t('a1'),
    q2: t('q2'),
    a2: t('a2'),
    q3: t('q3'),
    a3: t('a3'),
    q4: t('q4'),
    a4: t('a4'),
  };

  return (
    <>
      <HeroSection translations={heroTranslations} />
      <AboutSection translations={aboutTranslations} />
      <AnimatedPrinciples locale={locale} />
      <FAQSection translations={faqTranslations} />
    </>
  );
};
