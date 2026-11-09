'use client';

import Button from '@/components/Button';
import '@/styles/global.css';

export default function GlobalError({ reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main className="site-frame justify-center py-16">
          <div className="mx-auto w-full max-w-2xl">
            <p className="eyebrow text-accent-strong">CodeStoryBro</p>
            <h1 className="display-title mt-5">Something went wrong.</h1>
            <p className="mt-5 leading-relaxed text-muted">
              Please try again. If the problem continues, return to the home page.
            </p>
            <Button className="mt-8" onClick={reset}>Try again</Button>
          </div>
        </main>
      </body>
    </html>
  );
}
