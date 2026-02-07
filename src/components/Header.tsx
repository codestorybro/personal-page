'use client';
import type { FC } from 'react';
import { DiscordLogoIcon, GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon, ListIcon, XIcon, XLogoIcon, YoutubeLogoIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type Props = {
  locale: string;
};

const MotionLink = motion.create(Link);

const socialLinks = [
  { name: 'X', href: 'https://x.com/codestorybro', icon: XLogoIcon },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/codestorybro/', icon: LinkedinLogoIcon },
  { name: 'Instagram', href: 'https://instagram.com/codestorybro/', icon: InstagramLogoIcon },
  { name: 'GitHub', href: 'https://github.com/codestorybro', icon: GithubLogoIcon },
  { name: 'YouTube', href: 'https://youtube.com/@codestorybro', icon: YoutubeLogoIcon },
  { name: 'Discord', href: 'https://discord.gg/7VNpaBGCNr', icon: DiscordLogoIcon },
];

export const Header: FC<Props> = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.div
      className="flex w-full items-center justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <MotionLink
        href="/"
        className="flex h-22 flex-row items-center rounded-3xl pr-4 focus:outline-none focus-visible:ring-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <motion.div
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
          />
        </motion.div>
        <span className="ml-4 font-logoText text-3xl italic text-white sm:text-5xl" style={{ lineHeight: '95px' }}>
          CodeStoryBro
        </span>
      </MotionLink>

      {/* Desktop social links */}
      <nav className="hidden items-center gap-2 lg:flex" aria-label="Social media links">
        {socialLinks.map(social => (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <social.icon size={24} weight="regular" />
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
            className="fixed inset-0 top-[88px] z-40 bg-black/95 backdrop-blur-md lg:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center gap-6 pt-12" aria-label="Social media links mobile">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg px-6 py-3 text-xl text-gray-300 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <social.icon size={28} weight="regular" />
                  <span>{social.name}</span>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
