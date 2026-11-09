import { SiteShell } from '@/components/SiteShell';
import Link from 'next/link';

export default function NotFound() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-2xl py-20 sm:py-28">
        <p className="eyebrow text-accent-strong">404</p>
        <h1 className="display-title mt-5">This page does not exist.</h1>
        <p className="mt-5 leading-7 text-muted">The link may be outdated, or the page may have moved.</p>
        <Link href="/" className="text-action mt-5">
          <span aria-hidden="true">←</span>
          <span className="link-label">Back to CodeStoryBro</span>
        </Link>
      </div>
    </SiteShell>
  );
}
