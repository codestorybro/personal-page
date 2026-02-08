import Footer from '@/components/Footer';
import { Header } from '@/components/Header';
import { setRequestLocale } from 'next-intl/server';

export default async function BlogLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <header className="sticky top-0 z-50 border-b border-white/20 bg-black/70 backdrop-blur-md">
        <div className="mx-auto my-2 w-full max-w-screen-xl px-8">
          <Header locale={locale} />
        </div>
      </header>
      <div className="flex flex-1 flex-col items-center p-8 pt-0 font-bodyText text-base text-bodyText lg:pr-0">
        <div className="w-full max-w-screen-xl">
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
