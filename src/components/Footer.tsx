'use client';

import type { FC } from 'react';
import { useCopyEmail } from '@/hooks/useCopyEmail';
import { AppConfig } from '@/utils/AppConfig';

const socialLinks = [
  { name: 'LinkedIn', href: AppConfig.social.linkedin },
  { name: 'Threads', href: AppConfig.social.threads },
  { name: 'Instagram', href: AppConfig.social.instagram },
  { name: 'Discord', href: AppConfig.social.discord },
  { name: 'YouTube', href: AppConfig.social.youtube },
];

const Footer: FC = () => {
  const copyEmail = useCopyEmail();

  return (
    <footer className="mt-4 border-t-2 border-t-zinc-800">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 p-8 text-center">
        <p className="text-sm font-semibold text-gray-300">
          Najtrudniejsze w&nbsp;IT rzadko jest techniczne.
        </p>
        <p className="text-sm text-gray-500">
          Komentarze o&nbsp;absurdach, napięciach i&nbsp;ludzkiej stronie świata IT i&nbsp;technologii.
        </p>

        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2" aria-label="Social media i kontakt CodeStoryBro">
          {socialLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name === 'Discord' ? 'Community CSB na Discordzie' : `CodeStoryBro na ${link.name}`}
              className="text-sm text-gray-400 transition hover:-translate-y-px hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              {link.name}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              void copyEmail();
            }}
            aria-label={`Skopiuj adres email ${AppConfig.author.email}`}
            className="text-sm text-gray-400 transition hover:-translate-y-px hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {AppConfig.author.email}
          </button>
        </nav>

        <p className="text-xs text-gray-600">
          ©
          {new Date().getFullYear()}
          {' '}
          Marcin Kołodziej - CodeStoryBro
        </p>
      </div>
    </footer>
  );
};

export default Footer;
