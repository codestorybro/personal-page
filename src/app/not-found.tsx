import type { CSSProperties } from 'react';
import Link from 'next/link';

const t = {
  title: '404',
  heading: 'Tu nie ma tej strony.',
  description: 'Link mógł się zdezaktualizować. Wróć do materiałów o leadershipie, zespołach i karierze w IT.',
  back_home: 'Wróć do CodeStoryBro',
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-8 text-center">
      <div className="content-enter max-w-md">
        <h1 className="not-found-glow font-logoText text-8xl text-white sm:text-9xl">
          404
        </h1>

        <p
          className="content-enter mt-4 text-2xl font-bold text-white sm:text-3xl"
          style={{ '--enter-delay': '0.3s' } as CSSProperties}
        >
          {t.heading}
        </p>

        <p
          className="content-enter mt-4 text-gray-400"
          style={{ '--enter-delay': '0.5s' } as CSSProperties}
        >
          {t.description}
        </p>

        <div
          className="content-enter mt-8"
          style={{ '--enter-delay': '0.7s' } as CSSProperties}
        >
          <Link
            href="/"
            className="group relative inline-flex cursor-pointer items-center justify-center gap-3 rounded-lg border border-[#333333] px-6 py-3 text-base font-medium text-white transition duration-300 hover:scale-110 hover:border-indigo-400/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-95 sm:px-8 sm:py-4 sm:text-lg"
          >
            {/* Blur glow effect on hover */}
            <span
              className="pointer-events-none absolute inset-0 rounded-lg bg-indigo-500 opacity-0 blur-[20px] transition-opacity duration-300 group-hover:opacity-40"
              aria-hidden="true"
            />
            <span className="relative z-10">{t.back_home}</span>
          </Link>
        </div>

        {/* Animated background elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {['bubble-1', 'bubble-2', 'bubble-3', 'bubble-4', 'bubble-5'].map((id, i) => (
            <div
              key={id}
              className="not-found-bubble absolute rounded-full bg-indigo-500/10"
              style={{
                'width': (i + 1) * 40 + 50,
                'height': (i + 1) * 40 + 50,
                'left': `${(i * 20) + 10}%`,
                'top': `${(i * 15) + 10}%`,
                '--bubble-duration': `${(i * 0.5) + 2}s`,
                '--bubble-delay': `${i * 0.4}s`,
              } as CSSProperties}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
