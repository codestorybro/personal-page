'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#090b0d] text-white">
        <main className="flex min-h-screen items-center justify-center p-8 text-center">
          <div className="max-w-lg">
            <p className="text-sm font-semibold tracking-[0.25em] text-amber-400">CODESTORYBRO</p>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Something went wrong.</h1>
            <p className="mt-4 leading-relaxed text-gray-400">
              Please try again. If the problem continues, return to the home page.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-8 rounded-lg border border-white/20 px-6 py-3 font-medium text-white transition-colors hover:border-indigo-400 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
