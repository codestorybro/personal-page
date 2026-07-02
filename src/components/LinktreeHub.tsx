'use client';

import type { FC, ReactNode } from 'react';
import { useCopyEmail } from '@/hooks/useCopyEmail';
import { AppConfig } from '@/utils/AppConfig';
import Image from 'next/image';
import { Toaster } from 'react-hot-toast';
import { GlitchLogo } from './GlitchLogo';

const links = [
  {
    name: 'YouTube',
    href: AppConfig.social.youtube,
    ariaLabel: 'CodeStoryBro na YouTube',
    icon: <YouTubeIcon />,
    title: 'YouTube',
    description: 'Dłuższe materiały o IT, technologii, ludziach, decyzjach, AI, karierze, konfliktach i tym, co dzieje się między kodem a biznesem.',
    accent: 'bg-red-500',
    iconBg: 'bg-red-500/10',
    textAccent: 'text-red-500',
  },
  {
    name: 'LinkedIn',
    href: AppConfig.social.linkedin,
    ariaLabel: 'Marcin Kołodziej na LinkedIn',
    icon: <LinkedInIcon />,
    title: 'LinkedIn',
    description: 'Zawodowa perspektywa na IT, technologię, ludzi, zespoły, decyzje, prelekcje i branżę od środka.',
    accent: 'bg-blue-500',
    iconBg: 'bg-blue-500/10',
    textAccent: 'text-blue-500',
  },
  {
    name: 'Threads',
    href: AppConfig.social.threads,
    ariaLabel: 'CodeStoryBro na Threads',
    icon: <ThreadsIcon />,
    title: 'Threads',
    description: 'Krótkie, mocne komentarze wprost o IT i technologii.',
    accent: 'bg-zinc-200',
    iconBg: 'bg-zinc-200/10',
    textAccent: 'text-zinc-200',
  },
  {
    name: 'Instagram',
    href: AppConfig.social.instagram,
    ariaLabel: 'CodeStoryBro na Instagramie',
    icon: <InstagramIcon />,
    title: 'Instagram',
    description: 'Rolki, memy i szybkie obserwacje o IT i technologii.',
    accent: 'bg-fuchsia-500',
    iconBg: 'bg-fuchsia-500/10',
    textAccent: 'text-fuchsia-500',
  },
  {
    name: 'Discord',
    href: AppConfig.social.discord,
    ariaLabel: 'Community CSB na Discordzie',
    icon: <DiscordIcon />,
    title: 'Discord',
    description: 'Społeczność CSB dla ludzi, którzy chcą pogadać otwarcie o świecie IT i technologii.',
    accent: 'bg-indigo-500',
    iconBg: 'bg-indigo-500/10',
    textAccent: 'text-indigo-500',
  },
] as const;

const contactLink = {
  name: 'Kontakt',
  ariaLabel: `Skopiuj adres email ${AppConfig.author.email}`,
  icon: <MailIcon />,
  title: 'Kontakt',
  description: 'Współpraca, podcasty, zaproszenia, prelekcje i propozycje biznesowe.',
  accent: 'bg-amber-400',
  iconBg: 'bg-amber-400/10',
  textAccent: 'text-amber-400',
} as const;

const linkCardClassName = 'group flex min-h-20 w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-left text-white no-underline shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/45 hover:bg-cyan-300/10 hover:shadow-[0_0_24px_rgba(0,229,255,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]';

type LinkCardContentProps = {
  link: {
    icon: ReactNode;
    title: string;
    description: string;
    accent: string;
    iconBg: string;
    textAccent: string;
  };
};

const LinkCardContent: FC<LinkCardContentProps> = ({ link }) => {
  return (
    <>
      <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${link.textAccent} ${link.iconBg}`} aria-hidden="true">
        {link.icon}
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="flex items-center gap-2 text-sm font-semibold">
          {link.title}
        </span>
        <span className="mt-1.5 block text-xs leading-snug text-gray-400">
          {link.description}
        </span>
      </span>
      <ArrowIcon />
    </>
  );
};

export const LinktreeHub: FC = () => {
  const copyEmail = useCopyEmail();

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-10 font-bodyText text-white antialiased">
      <Toaster />
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-8">
        <header className="flex flex-col items-center gap-4 text-center">
          <div className="relative">
            <div className="flex size-28 items-center justify-center overflow-hidden rounded-full border-2 border-cyan-300/30 bg-cyan-500/10 shadow-[0_0_30px_rgba(0,229,255,0.3)]">
              <Image
                src="/assets/img/about/about.webp"
                alt="Marcin Kołodziej, CodeStoryBro, Engineering Manager komentujący świat IT i technologii"
                width={112}
                height={112}
                priority
                className="size-full object-cover"
              />
            </div>
            <span className="absolute bottom-1 right-1 size-4 rounded-full border-2 border-[#0a0a0a] bg-green-400" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight" aria-label="CodeStoryBro">
              <GlitchLogo className="text-2xl" />
            </h1>
            <p className="mt-1 text-sm leading-relaxed text-gray-400">
              Marcin Kołodziej · Engineering Manager · Speaker
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              Komentuję absurdy, napięcia i&nbsp;patologie świata IT i&nbsp;technologii
            </p>
          </div>
        </header>

        <nav className="flex w-full flex-col gap-3" aria-label="Linki CodeStoryBro">
          {links.map(link => (
            <a
              key={link.name}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={link.ariaLabel}
              className={linkCardClassName}
            >
              <LinkCardContent link={link} />
            </a>
          ))}
          <button
            type="button"
            aria-label={contactLink.ariaLabel}
            className={`${linkCardClassName} cursor-pointer`}
            onClick={() => {
              void copyEmail();
            }}
          >
            <LinkCardContent link={contactLink} />
          </button>
        </nav>

        <footer className="pb-2 pt-4 text-center text-xs text-gray-600">
          ©
          {' '}
          {new Date().getFullYear()}
          ``
          {' '}
          Marcin Kołodziej - CodeStoryBro
        </footer>
      </div>
    </main>
  );
};

function IconSvg({ children, viewBox = '0 0 24 24' }: { children: ReactNode; viewBox?: string }) {
  return (
    <svg className="size-5" fill="currentColor" viewBox={viewBox} aria-hidden="true">
      {children}
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <IconSvg>
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14c.5-1.88.5-5.81.5-5.81s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
    </IconSvg>
  );
}

function LinkedInIcon() {
  return (
    <IconSvg>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0h.01Z" />
    </IconSvg>
  );
}

function ThreadsIcon() {
  return (
    <IconSvg viewBox="0 0 256 256">
      <path d="M186.42 123.65a63.81 63.81 0 0 0-11.13-6.72c-4-29.89-24-39.31-33.1-42.07-19.78-6-42.51 1.19-52.85 16.7a8 8 0 0 0 13.32 8.88c6.37-9.56 22-14.16 34.89-10.27 9.95 3 16.82 10.3 20.15 21a81.05 81.05 0 0 0-15.29-1.43c-13.92 0-26.95 3.59-36.67 10.1C94.3 127.57 88 139 88 152c0 20.58 15.86 35.52 37.71 35.52a48 48 0 0 0 34.35-14.81c6.44-6.7 14-18.36 15.61-37.1.38.26.74.53 1.1.8C186.88 144.05 192 154.68 192 168c0 19.36-20.34 48-64 48-26.73 0-45.48-8.65-57.34-26.44C60.93 175 56 154.26 56 128s4.93-47 14.66-61.56C82.52 48.65 101.27 40 128 40c32.93 0 54 13.25 64.53 40.52a8 8 0 1 0 14.93-5.75C194.68 41.56 167.2 24 128 24 96 24 72.19 35.29 57.34 57.56 45.83 74.83 40 98.52 40 128s5.83 53.17 17.34 70.44C72.19 220.71 96 232 128 232c30.07 0 48.9-11.48 59.4-21.1C200.3 199.08 208 183 208 168c0-18.34-7.46-33.68-21.58-44.35Zm-37.89 38a31.94 31.94 0 0 1-22.82 9.9c-10.81 0-21.71-6-21.71-19.52 0-12.63 12-26.21 38.41-26.21A63.88 63.88 0 0 1 160 128.24c0 14.08-4 25.62-11.47 33.38Z" />
    </IconSvg>
  );
}

function InstagramIcon() {
  return (
    <IconSvg>
      <path d="M12 0C8.74 0 8.33.02 7.05.07 5.78.13 4.91.33 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14.33 4.91.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.02 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.08 2.13 1.38.77.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.02 4.95-.07c1.28-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.67 1.08-1.34 1.38-2.13.3-.77.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.02-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.38-2.13A5.88 5.88 0 0 0 19.86.63c-.77-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 2.16c3.2 0 3.59.02 4.85.07 1.17.06 1.81.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.02 3.59-.07 4.85c-.06 1.17-.26 1.81-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.59-.02-4.85-.07c-1.17-.06-1.81-.26-2.23-.42-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.02-3.59.07-4.85c.06-1.17.26-1.81.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.41 2.18 8.8 2.16 12 2.16Zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm5.85-10.41a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
    </IconSvg>
  );
}

function DiscordIcon() {
  return (
    <IconSvg viewBox="0 0 127.14 96.36">
      <path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83A97.68 97.68 0 0 0 49 6.83 72.37 72.37 0 0 0 45.64 0 105.89 105.89 0 0 0 19.39 8.09C2.79 32.65-1.71 56.6.54 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14c2.64-27.38-4.51-51.11-18.9-72.15ZM42.45 65.69C36.18 65.69 31 60 31 53s5-12.74 11.43-12.74S54 46 53.89 53s-5.05 12.69-11.44 12.69Zm42.24 0C78.41 65.69 73.25 60 73.25 53s5-12.74 11.44-12.74S96.23 46 96.12 53s-5.04 12.69-11.43 12.69Z" />
    </IconSvg>
  );
}

function MailIcon() {
  return (
    <svg className="size-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="size-4 shrink-0 text-gray-500 transition group-hover:translate-x-0.5 group-hover:text-cyan-200" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
