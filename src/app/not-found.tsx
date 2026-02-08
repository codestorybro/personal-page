'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import translations from '@/locales/pl.json';

const MotionLink = motion.create(Link);

const t = translations.NotFound;

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
          {t.heading}
        </motion.p>

        <motion.p
          className="mt-4 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {t.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8"
        >
          <MotionLink
            href="/"
            className="group relative inline-flex cursor-pointer items-center justify-center gap-3 rounded-lg border border-[#333333] px-6 py-3 text-base font-medium text-white hover:border-indigo-400/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-8 sm:py-4 sm:text-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            {/* Blur glow effect on hover */}
            <span
              className="pointer-events-none absolute inset-0 rounded-lg bg-indigo-500 opacity-0 blur-[20px] transition-opacity duration-300 group-hover:opacity-40"
              aria-hidden="true"
            />
            <span className="relative z-10">{t.back_home}</span>
          </MotionLink>
        </motion.div>

        {/* Animated background elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {['bubble-1', 'bubble-2', 'bubble-3', 'bubble-4', 'bubble-5'].map((id, i) => (
            <motion.div
              key={id}
              className="absolute rounded-full bg-indigo-500/10"
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
