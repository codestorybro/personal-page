'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center py-16">
      {/* Animated loader */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Outer ring */}
        <motion.div
          className="size-16 rounded-full border-4 border-white/10"
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Inner spinning arc */}
        <motion.div
          className="absolute inset-0 size-16 rounded-full border-4 border-transparent border-t-indigo-500"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Pulsing center dot */}
        <motion.div
          className="absolute inset-0 m-auto size-3 rounded-full bg-indigo-500"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Loading text */}
      <motion.p
        className="mt-6 text-gray-400"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        Ładowanie artykułu...
      </motion.p>

      {/* Skeleton preview */}
      <motion.div
        className="mt-12 w-full max-w-2xl space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {/* Title skeleton */}
        <motion.div
          className="mx-auto h-10 w-3/4 rounded-lg bg-white/5"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Meta skeleton */}
        <motion.div
          className="mx-auto h-4 w-1/3 rounded bg-white/5"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
        />

        {/* Content skeletons */}
        <div className="space-y-3 pt-8">
          {[1, 2, 3, 4].map(i => (
            <motion.div
              key={i}
              className="h-4 rounded bg-white/5"
              style={{ width: `${100 - i * 10}%` }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
