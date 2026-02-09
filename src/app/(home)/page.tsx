import { FAQSection, HeroSection } from '@/components/AnimatedSections';
import { HomeJsonLd } from '@/components/JsonLd';
import { WhoIsSection } from '@/components/WhoIsSection';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://codestorybro.com';

export async function generateMetadata() {
  const canonicalUrl = SITE_URL;

  return {
    title: 'CodeStoryBro',
    description: 'Kod to tylko fragment historii. Reszta dzieje się między ludźmi.',
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
    },
    openGraph: {
      title: 'CodeStoryBro',
      description: 'Kod to tylko fragment historii. Reszta dzieje się między ludźmi.',
      url: canonicalUrl,
      siteName: 'CodeStoryBro',
      type: 'website',
      locale: 'pl',
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
      title: 'CodeStoryBro',
      description: 'Kod to tylko fragment historii. Reszta dzieje się między ludźmi.',
      images: [
        {
          url: `${SITE_URL}/assets/img/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'CodeStoryBro',
        },
      ],
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

export default function Index() {
  const heroTranslations = {
    sometimes_code_works: 'Kod to tylko fragment historii.',
    lets_talk_about_it: 'Reszta dzieje się między ludźmi.',
    loose_stories: 'O produktach, zespołach i lekcjach, którymi warto się dzielić.',
    check_my_work: 'Sprawdź moją twórczość',
  };

  const faqTranslations = {
    q1: 'Czy muszę być programistą, żeby tu być?',
    a1: 'Nie, ale jest spora szansa, że zaczniesz myśleć jak inżynier.',
    q2: 'Pracuję w innej technologii niż React - ma sens?',
    a2: 'Oczywiście. Skupiam się przede wszystkim na decyzjach i konsekwencjach, a nie na konkretnych frameworkach.',
    q3: 'Jak się z Tobą skontaktować?',
    a3: 'Najwygodniej przez media społecznościowe, ale zawsze możesz wysłać maila. Linki znajdziesz w górnym menu oraz w stopce.',
  };

  const whoIsTranslations = {
    title: 'Kim jest CodeStoryBro?',
    intro_1: 'Siema 👋',
    intro_2: 'Mam na imię Marcin. Nie zaczynałem od sceny ani od zarządzania zespołami. Na początku po prostu pisałem kod i uczyłem się na własnych błędach.',
    experience_1: 'Przez lata pracowałem jako software developer od poziomu Juniora po Staffa, później jako Engineering Manager.',
    experience_2: 'Budowałem produkty, prowadziłem zespoły, podejmowałem decyzje, które czasem działały, a czasem zostawiały ślad na dłużej.',
    today_intro: 'Dziś łączę te doświadczenia, opowiadając o inżynierii z perspektywy praktyka:',
    today_code: 'o kodzie, który trafia na produkcję,',
    today_people: 'o ludziach i relacjach, które za nim stoją,',
    today_lessons: 'oraz o wnioskach, które warto wynosić dalej - również na scenę.',
    summary_1: 'Porządkuję te historie.',
    summary_2: 'Nie udaję, że istnieją proste odpowiedzi.',
    collab_title: 'Współpraca',
    collab_intro: 'Jeśli organizujesz konferencję, meetup albo event związany z technologią, zespołami lub rozwojem inżynierów to porozmawiajmy.',
    collab_open: 'Jestem otwarty na:',
    collab_conferences: 'wystąpienia konferencyjne i warsztaty',
    collab_podcasts: 'rozmowy w podcastach i formatach wideo',
    collab_education: 'współpracę przy projektach edukacyjnych i społecznościowych',
    collab_outro_1: 'Jeśli masz pomysł - napisz.',
    collab_outro_2: 'Zobaczymy, czy i jak możemy zrobić z tego coś ciekawego.',
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
