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
    name: 'YouTube',
    href: AppConfig.social.youtube,
    description: 'Conversations about feedback, trust, difficult decisions, and the everyday work of leading an engineering team.',
    icon: <YouTubeIcon />,
  },
];

export function PersonalLanding() {
  return (
    <SiteShell>
      <section className="landing-hero" aria-labelledby="professional-headline">
        <div>
          <p className="eyebrow hero-kicker">People · Engineering · Leadership</p>
          <h1 id="professional-headline" className="display-title landing-title">
            <span className="block">Better conversations.</span>
            {' '}
            <span className="block">Stronger teams.</span>
            {' '}
            <em className="block text-accent">Better software.</em>
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
            Leading engineers takes technical judgment and human understanding. I give both the attention they deserve.
          </p>
          <p className="leading-relaxed text-muted">
            I’m Marcin Kołodziej — a software developer, engineering manager, and speaker. I talk about the conversations behind good engineering: giving useful feedback, building trust, and making difficult decisions together.
          </p>
          <p className="leading-relaxed text-muted">
            Kim Scott’s Radical Candor resonates with how I want to lead: care personally and challenge directly. Take people seriously, say what needs to be said, and make room for them to challenge you too.
          </p>
        </div>
      </section>

      <section className="editorial-section" data-reveal="" aria-labelledby="links-heading">
        <h2 id="links-heading" className="section-title">Let’s talk leadership</h2>
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
            Planning a talk, working through a leadership challenge, or want to exchange perspectives? Email me or start a conversation on LinkedIn.
          </p>
          <a href={`mailto:${AppConfig.author.email}`} className="text-action mt-3" aria-label={`Email ${AppConfig.author.email}`}>
            <span className="link-label">{AppConfig.author.email}</span>
            <span aria-hidden="true">↗</span>
          </a>
          <div>
            <a href={AppConfig.social.linkedin} className="text-action mt-3" target="_blank" rel="noopener noreferrer">
              <span className="link-label">LinkedIn</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function YouTubeIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
