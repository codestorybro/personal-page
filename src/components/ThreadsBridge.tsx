'use client';

import type { FC } from 'react';
import { AppConfig } from '@/utils/AppConfig';
import { motion } from 'framer-motion';
import { FadeInUp } from './AnimatedElements';

export const ThreadsBridge: FC = () => {
  const threadsUrl = AppConfig.social.threads;

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <FadeInUp>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent p-8 sm:p-12">
            <div
              className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-indigo-500/15 blur-3xl will-change-transform"
              aria-hidden="true"
              style={{ WebkitTransform: 'translateZ(0)' }}
            />

            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300">
                Krótko • celnie • z&nbsp;życia zespołów
              </div>

              <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                Krótkie obserwacje
                <span className="mt-2 block bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text pb-1 text-transparent">
                  z&nbsp;ludzkiej strony IT.
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
                Na Threads wrzucam krótkie myśli o&nbsp;leadershipie, trudnych rozmowach,
                pracy managera i&nbsp;tym, co naprawdę dzieje się między ludźmi w&nbsp;zespołach technologicznych.
                Rzeczy, które trudno nazwać na spotkaniu, choć większość osób w&nbsp;IT dobrze je zna.
              </p>

              <div className="mt-8">
                <motion.a
                  href={threadsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-6 py-3.5 text-base font-semibold text-white hover:border-indigo-400/50 hover:bg-indigo-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-8 sm:text-lg"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'tween', duration: 0.2 }}
                >
                  <span
                    className="pointer-events-none absolute -inset-2 rounded-lg bg-indigo-500 opacity-0 blur-xl transition-opacity duration-300 will-change-transform group-hover:opacity-30"
                    aria-hidden="true"
                    style={{ WebkitTransform: 'translateZ(0)' }}
                  />
                  <span className="relative z-10">Czytaj na Threads →</span>
                </motion.a>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};
