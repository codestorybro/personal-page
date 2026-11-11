import { HomeJsonLd } from '@/components/JsonLd';
import { PersonalLanding } from '@/components/PersonalLanding';
import { pageMetadata } from '@/utils/Metadata';
import { seoLocale } from '../../../packages/seo/content';

type Props = { searchParams: Promise<{ lang?: string }> };
export async function generateMetadata({ searchParams }: Props) {
  return pageMetadata('home', seoLocale((await searchParams).lang));
}
export default async function Index({ searchParams }: Props) {
  const locale = seoLocale((await searchParams).lang);
  return (
    <>
      <HomeJsonLd locale={locale} />
      <PersonalLanding />
    </>
  );
}
