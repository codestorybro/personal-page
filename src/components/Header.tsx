'use client';
import type { FC } from 'react';
import { useCopyEmail } from '@/hooks/useCopyEmail';
import { AppConfig } from '@/utils/AppConfig';
import { EnvelopeSimpleIcon, InstagramLogoIcon, LinkedinLogoIcon, ListIcon, ThreadsLogoIcon, XIcon, YoutubeLogoIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { useState } from 'react';
import { GlitchLogo } from './GlitchLogo';

const socialLinks = [
  { name: 'LinkedIn', label: 'Marcin Kołodziej na LinkedIn', href: AppConfig.social.linkedin, icon: LinkedinLogoIcon, hoverTextColor: 'hover:text-blue-100', hoverBgColor: 'bg-blue-500' },
  { name: 'YouTube', label: 'CodeStoryBro na YouTube', href: AppConfig.social.youtube, icon: YoutubeLogoIcon, hoverTextColor: 'hover:text-red-100', hoverBgColor: 'bg-red-600' },
  { name: 'Threads', label: 'CodeStoryBro na Threads', href: AppConfig.social.threads, icon: ThreadsLogoIcon, hoverTextColor: 'hover:text-white', hoverBgColor: 'bg-zinc-300' },
  { name: 'Instagram', label: 'CodeStoryBro na Instagram', href: AppConfig.social.instagram, icon: InstagramLogoIcon, hoverTextColor: 'hover:text-pink-100', hoverBgColor: 'bg-pink-500' },
];

export const Header: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const copyEmail = useCopyEmail();

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setIsMobileMenuOpen(false);

    if (window.location.pathname === '/') {
      event.preventDefault();
      const scrollOptions: ScrollToOptions = { top: 0, behavior: 'smooth' };

      window.scrollTo(scrollOptions);
      document.body.scrollTo(scrollOptions);
    }
  };

  return (
    <>
      <div className="flex w-full animate-fadeIn items-center justify-between">
        <Link
          href="/"
          aria-label="CodeStoryBro — strona główna"
          onClick={handleLogoClick}
          className="flex flex-row items-center rounded-lg px-4 transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-[0.98]"
        >
          <GlitchLogo className="ml-2 text-3xl sm:ml-4 sm:text-4xl" />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-2 lg:flex" aria-label="Główna nawigacja">
          {/* Social links */}
          {socialLinks.map(social => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={`group relative rounded-lg p-1 text-gray-400 transition duration-200 hover:scale-110 active:scale-95 ${social.hoverTextColor} focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500`}
            >
              <span
                className={`pointer-events-none absolute inset-0 rounded-lg ${social.hoverBgColor} opacity-0 blur-[6px] transition-opacity duration-300 group-hover:opacity-60`}
                aria-hidden="true"
              />
              <social.icon size={24} weight="regular" className="relative z-10" />
            </a>
          ))}

          {/* Divider */}
          <div className="ml-2 h-6 w-px bg-white/20" />

          {/* Contact CTA */}
          <button
            type="button"
            onClick={() => {
              void copyEmail();
            }}
            aria-label={`Skopiuj adres email ${AppConfig.author.email}`}
            className="group relative ml-2 inline-flex items-center gap-2 rounded-lg border border-[#333333] px-3 py-1.5 text-sm font-medium text-gray-400 transition duration-200 hover:scale-105 hover:border-indigo-400/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-95"
          >
            <span
              className="pointer-events-none absolute -inset-1 rounded-lg bg-indigo-500 opacity-0 blur-[10px] transition-opacity duration-300 group-hover:opacity-40"
              aria-hidden="true"
            />
            <EnvelopeSimpleIcon size={16} className="relative z-10" />
            <span className="relative z-10">Skontaktuj się</span>
          </button>
        </nav>

        {/* Mobile hamburger button */}
        <button
          type="button"
          className="rounded-lg p-2 text-gray-400 transition duration-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-95 lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen
            ? <XIcon size={28} weight="bold" />
            : <ListIcon size={28} weight="bold" />}
        </button>
      </div>

      {/* Mobile menu overlay - outside transformed element to fix Safari fixed positioning */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-x-0 bottom-0 top-[60px] z-40 overflow-y-auto lg:hidden"
        >
          <div className="menu-enter min-h-full bg-black">
            <nav className="flex flex-col items-center gap-6 py-8" aria-label="Nawigacja mobilna">
              {/* Contact CTA */}
              <button
                type="button"
                aria-label={`Skopiuj adres email ${AppConfig.author.email}`}
                className="content-enter content-enter-left flex items-center gap-3 rounded-lg border border-[#333333] px-6 py-3 text-xl text-gray-300 transition-colors hover:border-indigo-400/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  void copyEmail();
                }}
              >
                <EnvelopeSimpleIcon size={28} weight="regular" />
                <span>Skontaktuj się</span>
              </button>

              {/* Divider */}
              <div className="h-px w-32 bg-white/20" />

              {/* Social links */}
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="content-enter content-enter-left flex items-center gap-3 rounded-lg px-6 py-3 text-xl text-gray-300 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  style={{ '--enter-delay': `${(index + 1) * 0.1}s` } as React.CSSProperties}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <social.icon size={28} weight="regular" />
                  <span>{social.name}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
