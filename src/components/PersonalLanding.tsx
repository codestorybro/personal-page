import type { ReactNode } from 'react';
import { AppConfig } from '@/utils/AppConfig';
import Image from 'next/image';

type SocialLink = {
  name: string;
  href: string;
  description: string;
  icon: ReactNode;
};

const socialLinks: SocialLink[] = [
  {
    name: 'X',
    href: AppConfig.social.x,
    description: 'Thoughts on software development, technology, engineering leadership, and the industry.',
    icon: <XIcon />,
  },
  {
    name: 'LinkedIn',
    href: AppConfig.social.linkedin,
    description: 'Professional experience, engineering leadership, conference speaking, and industry insights.',
    icon: <LinkedInIcon />,
  },
];

const focusRing = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#090b0d]';

export function PersonalLanding() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#090b0d] font-bodyText text-white antialiased">
      <div className="personal-site-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[32rem] w-[64rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.055] blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between border-b border-white/10 py-6 sm:py-8">
          <div>
            <p className="text-lg font-semibold tracking-[-0.03em] text-white sm:text-xl">
              CodeStoryBro
            </p>
            <p className="mt-1 text-xs text-zinc-500">Marcin Kołodziej</p>
          </div>
        </header>

        <main>
          <section className="grid gap-10 border-b border-white/10 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-end lg:gap-16 lg:py-24" aria-labelledby="professional-headline">
            <div>
              <p className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">
                Software · Leadership · Speaking
              </p>
              <h1 id="professional-headline" className="max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                Software Developer. Engineering Manager. Conference Speaker.
              </h1>
            </div>

            <div className="relative mx-auto w-full max-w-xs overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-2 lg:mx-0">
              <Image
                src="/assets/img/about/about.webp"
                alt="Marcin Kołodziej speaking at a technology conference"
                width={320}
                height={400}
                priority
                fetchPriority="high"
                sizes="(min-width: 1024px) 272px, (min-width: 640px) 320px, calc(100vw - 56px)"
                className="aspect-[4/5] w-full rounded-xl object-cover object-center grayscale-[15%]"
              />
            </div>
          </section>

          <section className="grid gap-5 border-b border-white/10 py-12 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-12 sm:py-16" aria-labelledby="about-heading">
            <h2 id="about-heading" className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-500">
              About
            </h2>
            <div className="max-w-3xl space-y-5 text-lg leading-8 text-zinc-300 sm:text-xl sm:leading-9">
              <p>
                I build software, lead engineering teams, and speak about technology, software development, and engineering leadership.
              </p>
              <p>
                I have spent over a decade working in the technology industry, combining hands-on software engineering with technical leadership and team management.
              </p>
            </div>
          </section>

          <section className="border-b border-white/10 py-12 sm:py-16" aria-labelledby="links-heading">
            <div className="mb-7 flex items-end justify-between gap-4">
              <h2 id="links-heading" className="text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
                Find me online
              </h2>
              <span className="hidden font-mono text-xs uppercase tracking-[0.18em] text-zinc-600 sm:block" aria-hidden="true">
                02 profiles
              </span>
            </div>

            <nav className="grid gap-4 md:grid-cols-2" aria-label="Professional profiles">
              {socialLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit CodeStoryBro on ${link.name} (opens in a new tab)`}
                  className={`group flex min-h-48 flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.035] p-6 text-white no-underline transition-colors duration-200 hover:border-cyan-300/40 hover:bg-cyan-300/[0.07] sm:p-7 ${focusRing}`}
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-zinc-200" aria-hidden="true">
                      {link.icon}
                    </span>
                    <ArrowIcon />
                  </div>
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold -tracking-wide">{link.name}</h3>
                    <p className="mt-2 max-w-md text-sm leading-6 text-zinc-400">
                      {link.description}
                    </p>
                  </div>
                </a>
              ))}
            </nav>
          </section>

          <section className="grid gap-7 py-12 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:py-16" aria-labelledby="contact-heading">
            <div>
              <h2 id="contact-heading" className="text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
                Get in touch
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-400">
                For conference invitations, professional opportunities, and other enquiries, contact me by email.
              </p>
            </div>
            <a
              href={`mailto:${AppConfig.author.email}`}
              className={`inline-flex w-fit items-center gap-3 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-medium text-cyan-100 no-underline transition-colors hover:border-cyan-200 hover:bg-cyan-300/15 ${focusRing}`}
              aria-label={`Email ${AppConfig.author.email}`}
            >
              <MailIcon />
              {AppConfig.author.email}
            </a>
          </section>
        </main>

        <footer className="flex flex-col gap-3 border-t border-white/10 py-7 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            ©
            {' '}
            {new Date().getFullYear()}
            {' '}
            CodeStoryBro
          </p>
          <p>Software Development • Engineering Leadership • Public Speaking</p>
        </footer>
      </div>
    </div>
  );
}

function XIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-label="X" role="img">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-label="LinkedIn" role="img">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0h.01Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="size-5 text-zinc-600 transition-colors group-hover:text-cyan-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" aria-hidden="true">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}
