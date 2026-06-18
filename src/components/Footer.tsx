'use client';

import type { FC } from 'react';
import { motion } from 'framer-motion';

const socialLinks = [
  { name: 'YouTube', href: 'https://youtube.com/@codestorybro' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/codestorybro/' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@codestorybro' },
  { name: 'Instagram', href: 'https://www.instagram.com/codestorybro/' },
];

const Footer: FC = () => {
  return (
    <footer className="mt-4 border-t-2 border-t-zinc-800">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 p-8 text-center">
        <p className="text-sm font-semibold tracking-[0.2em] text-gray-300">
          LEAD • THINK • GROW
        </p>
        <p className="text-sm text-gray-500">
          Najtrudniejsze w&nbsp;IT rzadko jest techniczne.
        </p>

        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2" aria-label="Social media i kontakt CodeStoryBro">
          {socialLinks.map(link => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`CodeStoryBro na ${link.name}`}
              className="text-sm text-gray-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              whileHover={{ y: -1 }}
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a
            href="mailto:hello@codestorybro.com"
            aria-label="Kontakt z Marcinem Kołodziejem"
            className="text-sm text-gray-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            whileHover={{ y: -1 }}
          >
            Kontakt
          </motion.a>
        </nav>

        <p className="text-xs text-gray-600">
          ©
          {new Date().getFullYear()}
          {' '}
          Marcin Kołodziej — CodeStoryBro
        </p>
      </div>
    </footer>
  );
};

export default Footer;
