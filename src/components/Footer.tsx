'use client';
import type { FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const MotionLink = motion.create(Link);

const Footer: FC = () => {
  return (
    <footer className="mx-4 mt-4 border-t-2 border-t-zinc-800 pb-4">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-4 p-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          ©
          {new Date().getFullYear()}
          {' '}
          Wszelkie prawa zastrzeżone
          {' '}
          <span
            style={{ lineHeight: '49px' }}
            className="inline-block font-logoText text-2xl leading-3"
          >
            CodeStoryBro
          </span>
        </span>
        <nav className="flex items-center gap-4" aria-label="Footer navigation">
          <MotionLink
            href="/oferta"
            className="group relative rounded-lg px-2 py-1 text-sm text-gray-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-lg bg-green-500 opacity-0 blur-[10px] transition-opacity duration-300 group-hover:opacity-60"
              aria-hidden="true"
            />
            <span className="relative z-10">Oferta</span>
          </MotionLink>
          <MotionLink
            href="/check"
            className="group relative rounded-lg px-2 py-1 text-sm text-gray-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-lg bg-blue-500 opacity-0 blur-[10px] transition-opacity duration-300 group-hover:opacity-60"
              aria-hidden="true"
            />
            <span className="relative z-10">Sprawdź certyfikat</span>
          </MotionLink>
          <MotionLink
            href="mailto:hello@codestorybro.com"
            className="group relative rounded-lg px-2 py-1 text-sm text-gray-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-lg bg-yellow-500 opacity-0 blur-[10px] transition-opacity duration-300 group-hover:opacity-60"
              aria-hidden="true"
            />
            <span className="relative z-10">Skontaktuj się</span>
          </MotionLink>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
