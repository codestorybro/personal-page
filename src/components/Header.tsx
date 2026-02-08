'use client';
import type { FC } from 'react';
import { DiscordLogoIcon, EnvelopeSimpleIcon, GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon, ListIcon, XIcon, XLogoIcon, YoutubeLogoIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const MotionLink = motion.create(Link);

const socialLinks = [
  { name: 'X', href: 'https://x.com/codestorybro', icon: XLogoIcon },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/codestorybro/', icon: LinkedinLogoIcon },
  { name: 'Instagram', href: 'https://instagram.com/codestorybro/', icon: InstagramLogoIcon },
  { name: 'GitHub', href: 'https://github.com/codestorybro', icon: GithubLogoIcon },
  { name: 'YouTube', href: 'https://youtube.com/@codestorybro', icon: YoutubeLogoIcon },
  { name: 'Discord', href: 'https://discord.gg/7VNpaBGCNr', icon: DiscordLogoIcon },
  { name: 'Email', href: 'mailto:hello@codestorybro.com', icon: EnvelopeSimpleIcon },
];

export const Header: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.div
      className="flex w-full items-center justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <MotionLink
        href="/"
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
            alt="profile"
            priority
            className="h-6 w-auto sm:h-12"
          />
        </motion.div>
        <span className="ml-2 translate-y-[0.15em] font-logoText text-xl italic leading-none text-white sm:ml-4 sm:text-5xl">
          CodeStoryBro
        </span>
      </MotionLink>

      {/* Desktop navigation */}
      <nav className="hidden items-center gap-2 lg:flex" aria-label="Main navigation">
        {/* Blog link */}
        <MotionLink
          href="/blog"
          className="group relative mr-4 rounded-lg px-4 py-2 font-medium text-gray-400 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span
            className="pointer-events-none absolute inset-0 rounded-lg bg-indigo-500 opacity-0 blur-[10px] transition-opacity duration-300 group-hover:opacity-40"
            aria-hidden="true"
          />
          <span className="relative z-10">
            Blog
          </span>
        </MotionLink>

        {/* Divider */}
        <div className="mr-2 h-6 w-px bg-white/20" />

        {/* Social links */}
        {socialLinks.map(social => (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="group relative rounded-lg p-2 text-gray-400 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-lg bg-indigo-500 opacity-0 blur-[10px] transition-opacity duration-300 group-hover:opacity-60"
              aria-hidden="true"
            />
            <social.icon size={24} weight="regular" className="relative z-10" />
          </motion.a>
        ))}
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

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-x-0 top-[60px] z-40 overflow-hidden lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="bg-black"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <nav className="flex flex-col items-center gap-6 py-8" aria-label="Mobile navigation">
                {/* Blog link */}
                <MotionLink
                  href="/blog"
                  className="rounded-lg px-6 py-3 text-xl text-gray-300 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </MotionLink>

                {/* Divider */}
                <div className="h-px w-32 bg-white/20" />

                {/* Social links */}
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
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
    </motion.div>
  );
};
