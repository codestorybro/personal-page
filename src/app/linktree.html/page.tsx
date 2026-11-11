import { HomeJsonLd } from '@/components/JsonLd';
import { PersonalLanding } from '@/components/PersonalLanding';
import { pageMetadata } from '@/utils/Metadata';
import { seoLocale } from '../../../packages/seo/content';

type Props = { searchParams: Promise<{ lang?: string }> };
export async function generateMetadata({ searchParams }: Props) {
  return pageMetadata('home', seoLocale((await searchParams).lang), false);
}
export default async function LinktreePage({ searchParams }: Props) {
  return (
    <>
      <HomeJsonLd locale={seoLocale((await searchParams).lang)} />
      <PersonalLanding />
    </>
  );
}
