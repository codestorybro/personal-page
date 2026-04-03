'use client';

import type { FC } from 'react';
import { motion } from 'framer-motion';
import { FadeInUp } from './AnimatedElements';

const BMC_URL = 'https://buymeacoffee.com/codestorybro';

const CoffeeIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    width="24"
    height="24"
  >
    <path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.502.451-.399.801.064.217.2.36.37.465.21.128.443.224.684.29.541.15 1.092.261 1.649.348a38.3 38.3 0 003.598.318c1.156.056 2.32.038 3.471-.074.558-.054 1.115-.123 1.67-.205.293-.044.465-.36.398-.645zM7.5 12.5H4.3c-.134 0-.258.057-.344.155a.478.478 0 00-.117.363c.093 1.158.592 2.21 1.335 3.047A5.173 5.173 0 009 18.065v1.435H7a.5.5 0 000 1h10a.5.5 0 000-1h-2v-1.435a5.16 5.16 0 003.826-2.002 5.195 5.195 0 001.335-3.047.478.478 0 00-.117-.363.458.458 0 00-.344-.155h-3.2" />
  </svg>
);

export const SupportCraft: FC = () => {
  return (
    <FadeInUp>
      <aside
        aria-label="Wesprzyj autora"
        className="relative mt-8 overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 via-neutral-900/80 to-neutral-950/90 p-6 sm:p-10"
      >
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full bg-amber-500/10 blur-3xl will-change-transform"
          aria-hidden="true"
          style={{ WebkitTransform: 'translateZ(0)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 size-48 rounded-full bg-orange-500/10 blur-3xl will-change-transform"
          aria-hidden="true"
          style={{ WebkitTransform: 'translateZ(0)' }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <CoffeeIcon />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                Zatankuj następny tekst
              </h3>
              <p className="mt-1 text-sm text-amber-400/80">
                Bez reklam. Bez sponsorów. Bez cenzury.
              </p>
            </div>
          </div>

          {/* Copy */}
          <p className="mt-6 text-base leading-relaxed text-gray-300 sm:text-lg">
            Jeśli ten post dał Ci nową perspektywę albo po prostu dobrze się go czytało
            to zostaw kawę. Piję jej dużo, ale piszę jeszcze więcej. Dzięki, że jesteś!
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <motion.a
              href={BMC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 rounded-xl bg-[#FFDD00] px-6 py-3.5 text-base font-bold text-black transition-colors hover:bg-[#FFE84D] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-8 sm:text-lg"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'tween', duration: 0.2 }}
            >
              <span
                className="pointer-events-none absolute -inset-2 rounded-xl bg-amber-400 opacity-0 blur-xl transition-opacity duration-300 will-change-transform group-hover:opacity-30"
                aria-hidden="true"
                style={{ WebkitTransform: 'translateZ(0)' }}
              />
              <CoffeeIcon className="relative z-10 size-5" />
              <span className="relative z-10">Stawiam kawkę</span>
            </motion.a>

            <span className="text-sm text-gray-500">
              Dzięki Tobie treści zostają surowe i&nbsp;niezależne.
            </span>
          </div>
        </div>
      </aside>
    </FadeInUp>
  );
};
