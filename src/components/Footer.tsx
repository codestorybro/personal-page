'use client';
import type { FC } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const MotionLink = motion.create(Link);

const Footer: FC = () => {
  const t = useTranslations('General');

  return (
    <footer className="mx-4 mt-4 border-t-2 border-t-zinc-800 pb-4">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-4 p-4 sm:flex-row sm:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          ©
          {new Date().getFullYear()}
          {' '}
          {t('copy')}
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
            href="/check"
            className="text-sm text-gray-400 transition-colors hover:text-white focus:outline-none focus-visible:text-white focus-visible:underline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {t('certificate_check')}
          </MotionLink>
          <MotionLink
            href="mailto:hello@codestorybro.com"
            className="text-sm text-gray-400 transition-colors hover:text-white focus:outline-none focus-visible:text-white focus-visible:underline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {t('contact')}
          </MotionLink>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
