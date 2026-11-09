import type { ReactNode } from 'react';
import { SiteShell } from '@/components/SiteShell';
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

export function PersonalLanding() {
  return (
    <SiteShell>
      <section className="landing-hero" aria-labelledby="professional-headline">
        <div>
          <p className="eyebrow hero-kicker">Software · Leadership · Speaking</p>
          <h1 id="professional-headline" className="display-title landing-title">
            <span className="block">Software Developer.</span>
            {' '}
            <span className="block">Engineering Manager.</span>
            {' '}
            <em className="block text-accent">Conference Speaker.</em>
          </h1>
        </div>

        <figure className="portrait" data-reveal="">
          <div className="portrait-frame">
            <Image
              src="/assets/img/about/about.webp"
              alt="Marcin Kołodziej speaking at a technology conference"
              width={400}
              height={400}
              priority
              sizes="(min-width: 1100px) 285px, (min-width: 760px) 24vw, (min-width: 360px) 272px, 80vw"
              className="aspect-[4/5] w-full object-cover grayscale"
            />
            <svg className="portrait-sketch" viewBox="0 0 92 76" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" aria-hidden="true">
              <path d="M5 66c17 4 37-4 42-16 5-12-9-16-13-8-5 11 21 16 37 0 8-8 12-18 13-34m-8 7 9-9 4 12" />
              <path d="m21 18 2-9m-8 16-8-1m13 8-6 6" />
            </svg>
          </div>
          <figcaption className="eyebrow mt-4 flex items-center gap-3 text-muted">
            <span className="text-accent" aria-hidden="true">Fig. 01</span>
            Marcin Kołodziej
          </figcaption>
        </figure>
      </section>

      <section className="editorial-section" data-reveal="" aria-labelledby="about-heading">
        <h2 id="about-heading" className="section-title">About</h2>
        <div className="max-w-2xl space-y-4">
          <p className="font-editorial text-2xl leading-snug sm:text-3xl">
            I&nbsp;build software, lead engineering teams, and speak about technology, software development, and engineering leadership.
          </p>
          <p className="leading-relaxed text-muted">
            I&nbsp;have spent over a&nbsp;decade working in the technology industry, combining hands-on software engineering with technical leadership and team management.
          </p>
        </div>
      </section>

      <section className="editorial-section" data-reveal="" aria-labelledby="links-heading">
        <h2 id="links-heading" className="section-title">Find me online</h2>
        <nav aria-label="Professional profiles">
          <ul className="divide-y divide-rule border-y border-rule">
            {socialLinks.map(link => (
              <li key={link.name}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-row grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4 py-5 sm:gap-5"
                >
                  <span className="mt-1 text-accent">{link.icon}</span>
                  <div>
                    <h3 className="row-title"><span className="link-label">{link.name}</span></h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{link.description}</p>
                  </div>
                  <span className="row-arrow" aria-hidden="true">↗</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <section className="editorial-section" data-reveal="" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="section-title">Get in touch</h2>
        <div>
          <p className="max-w-lg leading-relaxed text-muted">
            For conference invitations, professional opportunities, and other enquiries, contact me by email.
          </p>
          <a href={`mailto:${AppConfig.author.email}`} className="text-action mt-3" aria-label={`Email ${AppConfig.author.email}`}>
            <span className="link-label">{AppConfig.author.email}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </SiteShell>
  );
}

function XIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0h.01Z" />
    </svg>
  );
}
