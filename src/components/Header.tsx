'use client';
import type { FC } from 'react';
import { useCopyEmail } from '@/hooks/useCopyEmail';
import { AppConfig } from '@/utils/AppConfig';
import { EnvelopeSimpleIcon, LinkedinLogoIcon, ListIcon, ThreadsLogoIcon, XIcon, YoutubeLogoIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { GlitchLogo } from './GlitchLogo';

const MotionLink = motion.create(Link);

const socialLinks = [
  { name: 'YouTube', label: 'CodeStoryBro na YouTube', href: AppConfig.social.youtube, icon: YoutubeLogoIcon, hoverTextColor: 'hover:text-red-100', hoverBgColor: 'bg-red-500' },
  { name: 'LinkedIn', label: 'Marcin Kołodziej na LinkedIn', href: AppConfig.social.linkedin, icon: LinkedinLogoIcon, hoverTextColor: 'hover:text-blue-100', hoverBgColor: 'bg-blue-500' },
  { name: 'Threads', label: 'CodeStoryBro na Threads', href: AppConfig.social.threads, icon: ThreadsLogoIcon, hoverTextColor: 'hover:text-white', hoverBgColor: 'bg-zinc-300' },
];

export const Header: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const copyEmail = useCopyEmail();

  return (
    <>
      <motion.div
        className="flex w-full items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <MotionLink
          href="/"
          aria-label="CodeStoryBro — strona główna"
          className="flex flex-row items-center rounded-lg px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <motion.div
            className="flex items-center"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              draggable={false}
              width={50}
              height={68}
              src="/assets/img/logo-main.svg"
              alt=""
              priority
              className="h-6 w-auto sm:h-12"
            />
          </motion.div>
          <GlitchLogo className="ml-2 sm:ml-4" />
        </MotionLink>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-2 lg:flex" aria-label="Główna nawigacja">
          {/* Social links */}
          {socialLinks.map(social => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={`group relative rounded-lg p-1 text-gray-400 transition-colors ${social.hoverTextColor} focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span
                className={`pointer-events-none absolute inset-0 rounded-lg ${social.hoverBgColor} opacity-0 blur-[6px] transition-opacity duration-300 group-hover:opacity-60`}
                aria-hidden="true"
              />
              <social.icon size={24} weight="regular" className="relative z-10" />
            </motion.a>
          ))}

          {/* Divider */}
          <div className="ml-2 h-6 w-px bg-white/20" />

          {/* Contact CTA */}
          <motion.button
            type="button"
            onClick={() => {
              void copyEmail();
            }}
            aria-label={`Skopiuj adres email ${AppConfig.author.email}`}
            className="group relative ml-2 inline-flex items-center gap-2 rounded-lg border border-[#333333] px-3 py-1.5 text-sm font-medium text-gray-400 transition-colors hover:border-indigo-400/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span
              className="pointer-events-none absolute -inset-1 rounded-lg bg-indigo-500 opacity-0 blur-[10px] transition-opacity duration-300 group-hover:opacity-40"
              aria-hidden="true"
            />
            <EnvelopeSimpleIcon size={16} className="relative z-10" />
            <span className="relative z-10">Skontaktuj się</span>
          </motion.button>
        </nav>

        {/* Mobile hamburger button */}
        <motion.button
          type="button"
          className="rounded-lg p-2 text-gray-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen
              ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <XIcon size={28} weight="bold" />
                  </motion.div>
                )
              : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ListIcon size={28} weight="bold" />
                  </motion.div>
                )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Mobile menu overlay - outside transformed element to fix Safari fixed positioning */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-x-0 bottom-0 top-[60px] z-40 overflow-y-auto lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="min-h-full bg-black"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <nav className="flex flex-col items-center gap-6 py-8" aria-label="Nawigacja mobilna">
                {/* Contact CTA */}
                <motion.button
                  type="button"
                  aria-label={`Skopiuj adres email ${AppConfig.author.email}`}
                  className="flex items-center gap-3 rounded-lg border border-[#333333] px-6 py-3 text-xl text-gray-300 transition-colors hover:border-indigo-400/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0 }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    void copyEmail();
                  }}
                >
                  <EnvelopeSimpleIcon size={28} weight="regular" />
                  <span>Skontaktuj się</span>
                </motion.button>

                {/* Divider */}
                <div className="h-px w-32 bg-white/20" />

                {/* Social links */}
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex items-center gap-3 rounded-lg px-6 py-3 text-xl text-gray-300 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + 1) * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <social.icon size={28} weight="regular" />
                    <span>{social.name}</span>
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
