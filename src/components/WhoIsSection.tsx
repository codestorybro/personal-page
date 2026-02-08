'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { FadeInLeft, FadeInRight, FadeInUp } from './AnimatedElements';

type WhoIsSectionProps = {
  translations: {
    title: string;
    intro_1: string;
    intro_2: string;
    experience_1: string;
    experience_2: string;
    today_intro: string;
    today_code: string;
    today_people: string;
    today_lessons: string;
    summary_1: string;
    summary_2: string;
    collab_title: string;
    collab_intro: string;
    collab_open: string;
    collab_conferences: string;
    collab_podcasts: string;
    collab_education: string;
    collab_outro_1: string;
    collab_outro_2: string;
  };
};

export const WhoIsSection: FC<WhoIsSectionProps> = ({ translations: t }) => {
  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <div className="relative mb-12 w-fit">
            {/* Glow blur behind the title */}
            <div
              className="pointer-events-none absolute -inset-4 bg-gradient-to-r from-blue-600/30 via-green-500/30 to-indigo-400/30 blur-2xl"
              aria-hidden="true"
            />
            <h2 className="relative bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text pb-1 text-3xl font-bold leading-relaxed text-transparent sm:text-4xl lg:text-5xl">
              {t.title}
            </h2>
          </div>
        </FadeInUp>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content column */}
          <div className="space-y-6">
            <FadeInLeft delay={0.1}>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg leading-relaxed">
                  {t.intro_1}
                  <br />
                  {t.intro_2}
                </p>

                <p className="leading-relaxed">
                  {t.experience_1}
                  <br />
                  {t.experience_2}
                </p>

                <p className="leading-relaxed">
                  {t.today_intro}
                </p>
                <ul className="ml-4 space-y-1 text-gray-400">
                  <li>{t.today_code}</li>
                  <li>{t.today_people}</li>
                  <li>{t.today_lessons}</li>
                </ul>

                <p className="leading-relaxed">
                  {t.summary_1}
                  <br />
                  <span className="text-gray-400">{t.summary_2}</span>
                </p>
              </div>
            </FadeInLeft>

            {/* Współpraca section */}
            <FadeInLeft delay={0.2}>
              <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="mb-4 text-xl font-semibold text-white">
                  {t.collab_title}
                </h3>
                <div className="space-y-4 text-gray-300">
                  <p className="leading-relaxed">{t.collab_intro}</p>

                  <p className="font-medium text-white">{t.collab_open}</p>
                  <ul className="ml-4 space-y-2 text-gray-400">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-green-500" />
                      {t.collab_conferences}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-green-500" />
                      {t.collab_podcasts}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-green-500" />
                      {t.collab_education}
                    </li>
                  </ul>

                  <p className="leading-relaxed">
                    {t.collab_outro_1}
                    <br />
                    <span className="text-gray-400">{t.collab_outro_2}</span>
                  </p>
                </div>
              </div>
            </FadeInLeft>
          </div>

          {/* Image column */}
          <FadeInRight delay={0.2}>
            <div className="relative lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src="/assets/img/about/about.webp"
                  alt="CodeStoryBro"
                  width={600}
                  height={800}
                  className="size-full object-cover"
                />
              </div>
              {/* Decorative glow */}
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-blue-500/20 via-transparent to-green-500/20 blur-2xl" />
            </div>
          </FadeInRight>
        </div>
      </div>
    </section>
  );
};
