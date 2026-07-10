import Link from 'next/link';

const t = {
  title: '404',
  heading: 'This page does not exist.',
  description: 'The link may be outdated, or the page may have moved.',
  back_home: 'Back to CodeStoryBro',
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090b0d] p-8 text-center text-white">
      <div className="max-w-md">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">{t.title}</p>
        <h1 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{t.heading}</h1>
        <p className="mt-4 leading-7 text-zinc-400">{t.description}</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-medium text-cyan-100 transition-colors hover:border-cyan-200 hover:bg-cyan-300/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#090b0d]"
        >
          {t.back_home}
        </Link>
      </div>
    </main>
  );
}
