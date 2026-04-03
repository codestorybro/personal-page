'use client';

import type { FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { FadeInUp } from './AnimatedElements';

const MotionLink = motion.create(Link);

export const BlogBridge: FC = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <FadeInUp>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent p-8 sm:p-12">
            {/* Ambient glow */}
            <div
              className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-indigo-500/15 blur-3xl will-change-transform"
              aria-hidden="true"
              style={{ WebkitTransform: 'translateZ(0)' }}
            />

            <div className="relative z-10">
              {/* Social proof */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300">
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>2k+ obserwujących</span>
              </div>

              {/* Heading */}
              <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                IT to ludzie, kryzysy i&nbsp;sposób myślenia.
                <span className="mt-2 block bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text pb-1 text-transparent">
                  Jak nigdy wcześniej.
                </span>
              </h2>

              {/* Description */}
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
                Piszę o&nbsp;miękkiej stronie technologii, zarządzaniu, przywództwie
                i&nbsp;kryzysach tożsamości współczesnych developerów.
              </p>

              {/* CTA */}
              <div className="mt-8">
                <MotionLink
                  href="/blog"
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
                  <span className="relative z-10">Zanurz się w&nbsp;moich przemyśleniach</span>
                  <motion.span
                    className="relative z-10"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ type: 'tween', duration: 0.2 }}
                  >
                    →
                  </motion.span>
                </MotionLink>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};
