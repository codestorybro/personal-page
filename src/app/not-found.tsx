'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const MotionLink = motion.create(Link);

// Translations for not-found page (outside of [locale] routing)
const translations = {
  heading: 'Ups! Strona nie istnieje',
  description: 'Wygląda na to, że kod się zgubił... Ale spokojnie, to nie Twoja wina (prawdopodobnie).',
  back_home: 'Wróć na stronę główną',
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-md"
      >
        <motion.h1
          className="font-logoText text-8xl text-white sm:text-9xl"
          animate={{
            textShadow: [
              '0 0 20px rgba(56, 189, 248, 0.5)',
              '0 0 40px rgba(56, 189, 248, 0.3)',
              '0 0 20px rgba(56, 189, 248, 0.5)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          404
        </motion.h1>

        <motion.p
          className="mt-4 text-2xl font-bold text-white sm:text-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {translations.heading}
        </motion.p>

        <motion.p
          className="mt-4 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {translations.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8"
        >
          <MotionLink
            href="/"
            className="group relative inline-flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-[#333333] px-6 py-3 text-base font-medium text-white transition-all duration-300 hover:border-sky-400/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 sm:px-8 sm:py-4 sm:text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {/* Blur glow effect on hover */}
            <motion.span
              className="pointer-events-none absolute inset-0 rounded-xl bg-sky-500"
              initial={{ opacity: 0, filter: 'blur(20px)' }}
              whileHover={{ opacity: 0.4, filter: 'blur(25px)' }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            />
            <span className="relative z-10">{translations.back_home}</span>
          </MotionLink>
        </motion.div>

        {/* Animated background elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {['bubble-1', 'bubble-2', 'bubble-3', 'bubble-4', 'bubble-5'].map((id, i) => (
            <motion.div
              key={id}
              className="absolute rounded-full bg-sky-500/10"
              style={{
                width: (i + 1) * 40 + 50,
                height: (i + 1) * 40 + 50,
                left: `${(i * 20) + 10}%`,
                top: `${(i * 15) + 10}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: (i * 0.5) + 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.4,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
