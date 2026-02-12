'use client';

import type { FC } from 'react';
import { motion } from 'framer-motion';
import { FadeInUp, StaggerContainer, StaggerItem } from './AnimatedElements';
import { ButtonLink } from './Button';

// ============================================================================
// OFFER HERO SECTION
// ============================================================================

export const OfferHeroSection: FC = () => {
  return (
    <section className="py-8 sm:py-16">
      <FadeInUp>
        <div className="relative mb-6 w-fit">
          {/* Glow blur behind the title */}
          <div
            className="pointer-events-none absolute -inset-4 bg-indigo-500/40 blur-3xl"
            aria-hidden="true"
          />
          <h1 className="relative text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            <span className="mt-2 block bg-gradient-to-r from-blue-500 via-green-400 to-indigo-500 bg-clip-text pb-4 text-transparent">
              Oferta rozwoju dla developerów
            </span>
          </h1>
        </div>
        <p className="mt-6 max-w-3xl text-lg text-gray-400">
          Wybieram formę współpracy dopasowaną do Twojej sytuacji i&nbsp;celów.
          Od indywidualnego mentoringu po warsztaty dla firm.
        </p>
      </FadeInUp>
    </section>
  );
};

// ============================================================================
// MENTORING 1:1 SECTION
// ============================================================================

export const MentoringSection: FC = () => {
  const outcomes = [
    'Jasny plan świadomego przejścia do roli managera lub Tech Leada',
    'Rozwinięte kompetencje komunikacyjne i\u00A0przywódcze',
    'Umiejętność delegowania bez utraty kontroli',
    'Pewność w\u00A0prowadzeniu trudnych rozmów',
    'Zdolność wpływania na decyzje bez formalnej władzy',
    'Balance między technikaliami a\u00A0zarządzaniem',
    'Sieć kontaktów z\u00A0podobnymi osobami na podobnym etapie rozwoju',
    'Certyfikat potwierdzający rozwój kompetencji managerskich',
  ];

  const forWhom = [
    'Developerów planujących awans na stanowiska managerskie',
    'Tech Leadów chcących rozwinąć stronę managerską',
    'Nowych managerów szukających wsparcia',
    'Inżynierów przygotowujących się do zmiany roli',
  ];

  return (
    <section id="mentoring" className="scroll-mt-24 py-16 sm:py-24">
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:p-12">
        <FadeInUp>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-400">
              Indywidualnie
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-gray-400">
              Najpopularniejsze
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            Mentoring 1:1
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-gray-300">
            Indywidualna praca nad Twoim rozwojem. Spotykamy się regularnie,
            analizujemy wyzwania i&nbsp;budujemy kompetencje potrzebne na dalszym etapie kariery.
          </p>
        </FadeInUp>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <FadeInUp delay={0.1}>
            <div>
              <h3 className="text-lg font-semibold text-white">Dla kogo?</h3>
              <ul className="mt-4 space-y-2">
                {forWhom.map(item => (
                  <li key={item} className="flex items-start gap-3 text-gray-400">
                    <span className="text-green-500">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <div>
              <h3 className="text-lg font-semibold text-white">Co zyskasz?</h3>
              <ul className="mt-4 space-y-2">
                {outcomes.map(item => (
                  <li key={item} className="flex items-start gap-3 text-gray-400">
                    <span className="text-green-500">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInUp>
        </div>

        <FadeInUp delay={0.3}>
          <div className="mt-12 rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white">Format</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <span className="text-sm text-gray-500">Spotkania</span>
                <p className="text-white">60 min / tydzień lub co 2 tygodnie</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Forma</span>
                <p className="text-white">Online</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Czas trwania</span>
                <p className="text-white">Min. 3 miesiące</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Wsparcie</span>
                <p className="text-white">Asynchroniczne między sesjami</p>
              </div>
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.4}>
          <div className="mt-8">
            <ButtonLink href="mailto:hello@codestorybro.com?subject=Mentoring 1:1">
              Umów rozmowę wstępną
            </ButtonLink>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};

// ============================================================================
// CORPORATE WORKSHOPS SECTION
// ============================================================================

export const CorporateSection: FC = () => {
  const workshops = [
    {
      title: 'Leadership dla Tech Leadów',
      desc: 'Jak prowadzić zespół techniczny bez utraty wiarygodności inżynierskiej',
      duration: '1-2 dni',
    },
    {
      title: 'Komunikacja Senior → Manager',
      desc: 'Sztuka rozmowy z\u00A0biznesem, stakeholderami i\u00A0zespołem',
      duration: '1 dzień',
    },
    {
      title: 'Feedback w\u00A0zespole technicznym',
      desc: 'Jak dawać i\u00A0przyjmować informację zwrotną skutecznie',
      duration: '4-8h',
    },
    {
      title: 'Delegowanie bez bólu',
      desc: 'Jak oddawać zadania bez utraty jakości i\u00A0kontroli',
      duration: '4-8h',
    },
  ];

  const forWhom = [
    'Działy IT potrzebujące rozwijać przyszłych liderów',
    'Firmy z\u00A0wewnętrznymi programami talentowymi',
    'Organizacje przygotowujące awanse wewnętrzne',
    'Zespoły przechodzące transformację agile',
  ];

  return (
    <section id="warsztaty" className="scroll-mt-24 py-16 sm:py-24">
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:p-12">
        <FadeInUp>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-400">
              Dla firm
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            Warsztaty dla organizacji
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-gray-300">
            Dedykowane szkolenia dla zespołów IT. Rozwijam kompetencje managerskie
            i&nbsp;przywódcze u&nbsp;Waszych developerów i&nbsp;Tech Leadów.
          </p>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-white">Przykładowe warsztaty</h3>
            <StaggerContainer className="mt-6 grid gap-4 sm:grid-cols-2" staggerDelay={0.08}>
              {workshops.map(workshop => (
                <StaggerItem key={workshop.title}>
                  <motion.div
                    className="rounded-xl border border-white/10 bg-white/5 p-5"
                    whileHover={{ borderColor: 'rgba(99, 102, 241, 0.3)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="font-medium text-white">{workshop.title}</h4>
                      <span className="shrink-0 rounded-full bg-indigo-500/20 px-2 py-0.5 text-xs text-indigo-400">
                        {workshop.duration}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">{workshop.desc}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <div className="mt-12 rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white">Dla kogo?</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {forWhom.map(item => (
                <li key={item} className="flex items-start gap-3 text-gray-400">
                  <span className="text-indigo-500">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.3}>
          <div className="mt-8">
            <ButtonLink href="mailto:hello@codestorybro.com?subject=Warsztaty dla firmy">
              Zapytaj o ofertę
            </ButtonLink>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};

// ============================================================================
// SPEAKING SECTION
// ============================================================================

export const SpeakingSection: FC = () => {
  const topics = [
    'Przejście z\u00A0seniora do managera - prawdziwe studium przypadku i\u00A0wnioski',
    'Dlaczego senior developer ≠ dobry manager',
    'Leadership bez bullshitu - co naprawdę działa',
    'Feedback w\u00A0zespole technicznym',
    'Delegowanie dla perfekcjonistów',
  ];

  const formats = [
    { name: 'Keynote', desc: '30-60 min' },
    { name: 'Panel dyskusyjny', desc: 'Moderacja lub udział' },
  ];

  return (
    <section id="wystapienia" className="scroll-mt-24 py-16 sm:py-24">
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:p-12">
        <FadeInUp>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-amber-500/20 px-3 py-1 text-sm font-medium text-amber-400">
              Speaking
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            Wystąpienia konferencyjne
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-gray-300">
            Występuję na konferencjach IT, meetupach i&nbsp;wydarzeniach firmowych.
            Mówię o&nbsp;tym, czego nie uczą na bootcampach, czyli o&nbsp;ludziach, decyzjach i&nbsp;odpowiedzialności.
          </p>
        </FadeInUp>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <FadeInUp delay={0.1}>
            <div>
              <h3 className="text-lg font-semibold text-white">Przykładowe tematy</h3>
              <ul className="mt-4 space-y-2">
                {topics.map(topic => (
                  <li key={topic} className="flex items-start gap-3 text-gray-400">
                    <span className="text-amber-500">•</span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <div>
              <h3 className="text-lg font-semibold text-white">Formaty</h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {formats.map(format => (
                  <div key={format.name} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="font-medium text-white">{format.name}</p>
                    <p className="text-sm text-gray-400">{format.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>
        </div>

        <FadeInUp delay={0.3}>
          <div className="mt-8">
            <ButtonLink href="mailto:hello@codestorybro.com?subject=Wystąpienie na wydarzeniu">
              Zaproś na wydarzenie
            </ButtonLink>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};

// ============================================================================
// OFFER CTA SECTION
// ============================================================================

export const OfferCTASection: FC = () => {
  return (
    <section className="py-16 sm:py-24">
      <FadeInUp>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-green-500/10 via-blue-500/10 to-indigo-500/10 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Nie wiesz, co wybrać?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Umów się na bezpłatną rozmowę wstępną. Porozmawiamy o&nbsp;Twojej sytuacji
            i&nbsp;razem określimy, która forma współpracy będzie dla Ciebie najlepsza.
          </p>
          <div className="mt-8">
            <ButtonLink href="mailto:hello@codestorybro.com?subject=Rozmowa wstępna">
              Umów bezpłatną rozmowę
            </ButtonLink>
          </div>
        </div>
      </FadeInUp>
    </section>
  );
};
