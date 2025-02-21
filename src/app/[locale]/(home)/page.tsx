import Button from '@/components/Button';
import { Principles } from '@/components/Principles';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

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

  return (
    <>
      <main className="flex flex-col items-center pb-0 sm:pb-32 lg:flex-row lg:pb-48">
        <div className="w-full lg:w-1/2">
          <h1 className="inline-block text-4xl font-bold text-white lg:text-5xl">
            {t('sometimes_code_works')}
            <p className="text-base sm:text-right">
              {t('or')}
              &nbsp;
              {t('not')}
            </p>
            <p>{t('lets_talk_about_it')}</p>
          </h1>
          <p className="mt-6">{t('loose_stories')}</p>
          <div className="mt-6 flex space-x-4">
            <a href="https://discord.gg/7VNpaBGCNr" target="_blank" rel="noreferrer">
              <Button
                className="flex-none rounded-md bg-indigo-500 px-3.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {t('join_community')}
              </Button>
            </a>
          </div>
        </div>
        <div className="relative mt-0 flex w-full justify-center overflow-hidden py-16 sm:py-0 lg:w-1/2">
          <div className="relative grid items-start gap-[calc(0.25rem*8)] sm:grid-cols-3 lg:translate-x-20">
            <div className="mt-48 hidden justify-center sm:flex">
              <Image draggable={false} alt="hero 1 image" width={160} height={192} src="/assets/img/hero/1.webp" className="h-48 w-40 rounded-xl object-cover shadow-lg" />
            </div>
            <div className="mt-16 hidden flex-col sm:flex">
              <Image draggable={false} alt="hero 2 image" width={160} height={256} src="/assets/img/hero/2.webp" className="h-64 w-40 rounded-xl object-cover shadow-lg" />
              <Image draggable={false} alt="hero 3 image" width={160} height={256} src="/assets/img/hero/3.webp" className="h-64 w-40 rounded-xl object-cover shadow-lg" />
            </div>
            <div className="flex flex-col">
              <Image draggable={false} alt="hero 4 image" width={160} height={256} src="/assets/img/hero/4.webp" className="h-64 w-40 rounded-xl object-cover shadow-lg" />
              <Image draggable={false} alt="hero 5 image" width={160} height={208} src="/assets/img/hero/5.webp" className="mt-14 hidden h-52 w-40 rounded-xl object-cover shadow-lg sm:block" />
            </div>
          </div>
        </div>
      </main>
      <section className="relative lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-5 lg:px-5">
          <div className="grid w-full grid-cols-1 items-center justify-start gap-12 lg:grid-cols-2">
            <div
              className="order-last grid w-full grid-cols-1 items-start justify-center gap-6 lg:order-first lg:grid-cols-2"
            >
              <div className="m-auto flex items-start justify-start gap-2.5 sm:justify-end sm:pt-24 lg:m-0 lg:justify-center">
                <Image draggable={false} width={384} height={288} className="rounded-xl object-cover" src="/assets/img/about/about-1.webp" alt="about Us image 1" />
              </div>
              <Image
                draggable={false}
                width={320}
                height={213}
                className="m-auto hidden rounded-xl object-cover sm:block lg:m-0"
                src="/assets/img/about/about-2.webp"
                alt="about Us image 2"
              />
            </div>
            <div className="inline-flex w-full flex-col items-center justify-center gap-10 lg:items-start">
              <div className="flex w-full flex-col items-start justify-center gap-8">
                <div className="flex w-full flex-col items-center justify-start gap-3 lg:items-start">
                  <h2
                    className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-center font-bold leading-normal text-transparent lg:text-start"
                  >
                    {t('learn_with_fun')}
                  </h2>
                  <p className="text-center text-lg font-normal leading-relaxed lg:text-start">
                    {t('about')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Principles locale={locale} />
      <section className="py-10 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="w-fit bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text font-bold leading-tight text-transparent">FAQ</h2>

          <div className="mt-12 flow-root sm:mt-16">
            <div className="-my-9 divide-y divide-zinc-800">
              <div className="pb-9">
                <p className="text-2xl font-semibold text-white">{t('q1')}</p>
                <p className="mt-3 text-lg">{t('a1')}</p>
              </div>

              <div className="py-9">
                <p className="text-2xl font-semibold text-white">{t('q2')}</p>
                <p className="mt-3 text-lg text-gray-400">{t('a2')}</p>
              </div>

              <div className="py-9">
                <p className="text-2xl font-semibold text-white">{t('q3')}</p>
                <p className="mt-3 text-lg text-gray-400">{t('a3')}</p>
              </div>

              <div className="py-9">
                <p className="text-2xl font-semibold text-white">{t('q4')}</p>
                <p className="mt-3 text-lg text-gray-400">
                  {t('a4')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};
