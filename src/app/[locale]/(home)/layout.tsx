import { setRequestLocale } from 'next-intl/server';
import { CustomCursor } from '@/components/CustomCursor';
import Footer from '@/components/Footer';
import { Header } from '@/components/Header';

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <CustomCursor />
      <div className="flex flex-col items-center p-8 font-bodyText text-base text-bodyText lg:pr-0">
        <div className="w-full max-w-screen-xl">
          <Header locale={locale} />
          <div className="my-8">{props.children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
