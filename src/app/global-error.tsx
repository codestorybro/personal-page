'use client';

import Button from '@/components/Button';
import { Footer } from '../../packages/ui/Footer';
import { Header, useAppLinks } from '../../packages/ui/Header';
import { LocaleProvider, useLocale } from '../../packages/ui/Locale';
import '@/styles/global.css';
import '../../packages/ui/header.css';
import '../../packages/ui/footer.css';
import '../../packages/ui/interaction.css';

function ErrorContent({ reset }: { reset: () => void }) {
  const { pick } = useLocale();
  const { stage } = useAppLinks(process.env.NEXT_PUBLIC_STAGE_URL);
  return (
    <div className="site-frame">
      <Header variant="Home" brandUrl="/" stageUrl={stage} />
      <main className="flex-1 py-16">
        <h1 className="display-title mt-5">{pick('Something went wrong.', 'Coś poszło nie tak.')}</h1>
        <p className="mt-5 leading-relaxed text-muted">{pick('Please try again. If the problem continues, return to the home page.', 'Spróbuj ponownie. Jeśli problem się powtórzy, wróć na stronę główną.')}</p>
        <Button className="mt-8" onClick={reset}>{pick('Try again', 'Spróbuj ponownie')}</Button>
      </main>
      <Footer />
    </div>
  );
}
export default function GlobalError({ reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pl">
      <body><LocaleProvider><ErrorContent reset={reset} /></LocaleProvider></body>
    </html>
  );
}
