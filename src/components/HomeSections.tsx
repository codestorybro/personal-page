'use client';

import type { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FadeInLeft, FadeInRight, FadeInUp, StaggerContainer, StaggerItem } from './AnimatedElements';
import { ButtonLink } from './Button';

// ============================================================================
// HERO SECTION
// ============================================================================

export const HeroSection: FC = () => {
  return (
    <section className="py-8 sm:py-16 lg:py-24">
      <div className="flex flex-col items-center text-center">
        <FadeInUp delay={0.2}>
          <div className="relative mb-6 w-fit">
            {/* Glow blur behind the title */}
            <div
              className="pointer-events-none absolute -inset-4 bg-indigo-500/40 blur-3xl will-change-transform"
              aria-hidden="true"
              style={{ WebkitTransform: 'translateZ(0)' }}
            />
            <h1 className="relative text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Od Developera
              <span className="mt-2 block bg-gradient-to-r from-blue-500 via-green-400 to-indigo-500 bg-clip-text pb-4 text-transparent">
                do Engineering Managera
              </span>
            </h1>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.4}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
            Pomagam świadomym developerom przejść z&nbsp;ról wykonawczych do zarządzania zespołami.
            Z&nbsp;perspektywy kogoś, kto sam przeszedł całą tę ścieżkę.
          </p>
        </FadeInUp>

        <FadeInUp delay={0.6}>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/oferta">
              Zobacz ofertę
            </ButtonLink>
            <ButtonLink href="#dla-kogo" variant="outline">
              Dla kogo to jest?
            </ButtonLink>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};

// ============================================================================
// DLA KOGO SECTION (Who It's For)
// ============================================================================

export const DlaKogoSection: FC = () => {
  const targetAudience = [
    {
      title: 'Ambitny developer',
      description: 'Masz za sobą parę lat doświadczenia i\u00A0czujesz, że pisanie kodu to już za mało. Szukasz czegoś więcej. Zaczynasz myśleć o\u00A0wpływie, procesach i\u00A0ludziach.',
      icon: '🎯',
    },
    {
      title: 'Tech Lead',
      description: 'Już prowadzisz technicznie zespół, ale chcesz rozwinąć kompetencje managerskie lub po prostu napotykasz na wyzwania związane z\u00A0zarządzaniem ludźmi.',
      icon: '🧭',
    },
  ];

  const notFor = [
    'zorientowania na konkretną technologię - CodeStoryBro jest w\u00A0pełni framework agnostic',
    'magicznych hacków na szybki awans - zaufaj mi, nie chcesz być managerem, który awansował bez przygotowania z\u00A0dnia na dzień',
  ];

  return (
    <section id="dla-kogo" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <FadeInUp>
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Dla kogo jest CodeStoryBro?
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-gray-400">
            Pracuję z&nbsp;inżynierami na określonym etapie kariery - tymi, którzy są gotowi
            na przejście z&nbsp;wykonawstwa do przywództwa.
          </p>
        </FadeInUp>

        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2" staggerDelay={0.1}>
          {targetAudience.map(item => (
            <StaggerItem key={item.title}>
              <motion.div
                className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                whileHover={{ y: -5, borderColor: 'rgba(34, 197, 94, 0.3)' }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-4xl">{item.icon}</span>
                <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-gray-400">{item.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeInUp delay={0.4}>
          <div className="mt-12 rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
            <h3 className="text-lg font-semibold text-red-400">Czego tu nie znajdziesz?</h3>
            <ul className="mt-4 space-y-2">
              {notFor.map(item => (
                <li key={item} className="flex items-center gap-3 text-gray-400">
                  <span className="text-red-400">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};

// ============================================================================
// PROBLEM SECTION
// ============================================================================

export const ProblemSection: FC = () => {
  const problems = [
    'Masz świetne kompetencje techniczne, ale nikt nie nauczył Cię zarządzać ludźmi.',
    'Nie wiesz, jak rozmawiać z\u00A0biznesem - i\u00A0czujesz, że tracisz na tym wpływ.',
    'Boisz się, że jako manager stracisz kontakt z\u00A0technologią.',
    'Delegowanie wydaje Ci się trudniejsze niż napisanie kodu samemu.',
    'Bugi w\u00A0kodzie łatwo naprawić, ale trudne rozmowy z\u00A0zespołem z\u00A0jakiegoś powodu odkładasz na później.',
    'Chcesz awansować, ale nie wiesz, od czego zacząć.',
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <FadeInUp>
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Rozpoznajesz to?
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-gray-400">
            Większość seniorów nie ma problemu z&nbsp;kodem. Challenge zaczyna się,
            gdy trzeba wyjść do ludzi.
          </p>
        </FadeInUp>

        <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2" staggerDelay={0.08}>
          {problems.map(problem => (
            <StaggerItem key={problem}>
              <motion.div
                className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4"
                whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-amber-500">→</span>
                <p className="text-gray-300">{problem}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

// ============================================================================
// TRANSFORMATION SECTION
// ============================================================================

export const TransformationSection: FC = () => {
  const transformations = [
    {
      from: 'Piszesz kod',
      to: 'Projektujesz rozwiązania i\u00A0rozwijasz ludzi',
    },
    {
      from: 'Realizujesz zadania',
      to: 'Ustalasz priorytety i\u00A0podejmujesz decyzje',
    },
    {
      from: 'Pracujesz w\u00A0zespole',
      to: 'Budujesz i\u00A0prowadzisz zespół',
    },
    {
      from: 'Mówisz językiem technologii',
      to: 'Komunikujesz się z\u00A0biznesem',
    },
    {
      from: 'Odpowiadasz za swój kod',
      to: 'Odpowiadasz za rezultaty zespołu',
    },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <FadeInUp>
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Co się zmieni?
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-gray-400">
            W&nbsp;mojej opinii, przejście do roli managera to zmiana mindsetu, a&nbsp;nie zwykły awans.
            Przeprowadzę Cię przez tę transformację.
          </p>
        </FadeInUp>

        <div className="mt-12 space-y-4">
          {transformations.map((t, index) => (
            <FadeInUp key={t.from} delay={index * 0.1}>
              <div className="grid items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 sm:grid-cols-[1fr,auto,1fr] sm:gap-8 sm:p-6">
                <div className="text-gray-400">
                  <span className="text-xs uppercase tracking-wider text-gray-500">Teraz</span>
                  <p className="mt-1">{t.from}</p>
                </div>
                <div className="hidden text-2xl text-green-500 sm:block">→</div>
                <div className="border-t border-white/10 pt-4 text-white sm:border-0 sm:pt-0">
                  <span className="text-xs uppercase tracking-wider text-green-500">Po programie</span>
                  <p className="mt-1 font-medium">{t.to}</p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// CREDIBILITY SECTION
// ============================================================================

export const CredibilitySection: FC = () => {
  const timeline = [
    { role: 'Intern', desc: 'Zaczynałem od podstaw', colorClass: 'bg-gray-400/20 text-gray-300' },
    { role: 'Junior', desc: 'Uczyłem się na błędach', colorClass: 'bg-green-500/20 text-green-400' },
    { role: 'Mid', desc: 'Brałem odpowiedzialność', colorClass: 'bg-blue-500/20 text-blue-400' },
    { role: 'Senior', desc: 'Projektowałem rozwiązania', colorClass: 'bg-indigo-500/20 text-indigo-400' },
    { role: 'Staff', desc: 'Wpływałem na architekturę', colorClass: 'bg-purple-500/20 text-purple-400' },
    { role: 'Manager', desc: 'Prowadzę zespoły', colorClass: 'bg-red-500/20 text-red-400' },
  ];

  const credentials = [
    'Wykładowca na kursach prywatnych oraz uczelni wyższej',
    'Rekruter techniczny - rozumiem proces z\u00A0perspektywy firmy i\u00A0kandydata',
    'Prelegent na ogólnopolskich konferencjach IT',
    'Lider budujący i\u00A0prowadzący zespoły produktowe',
    'Współpraca z\u00A0firmami z\u00A0Europy, USA i\u00A0Bliskiego Wschodu - od startupów po korporacje',
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <FadeInLeft>
              <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                Przeszedłem całą ścieżkę
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Jestem pragmatykiem. Sporo czytam, ale nie uczę prosto z&nbsp;książek. Mówię z&nbsp;doświadczenia, bo sam przeszedłem każdy etap,
                od interna do managera.
              </p>
            </FadeInLeft>

            <FadeInUp delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-2">
                {timeline.map((item, index) => (
                  <div
                    key={item.role}
                    className="flex items-center gap-2"
                  >
                    <span className={`rounded-full border border-white/10 px-3 py-1 text-sm font-medium ${item.colorClass}`}>
                      {item.role}
                    </span>
                    {index < timeline.length - 1 && (
                      <span className="text-gray-600">→</span>
                    )}
                  </div>
                ))}
              </div>
            </FadeInUp>

            <FadeInUp delay={0.4}>
              <ul className="mt-8 space-y-3">
                {credentials.map(cred => (
                  <li key={cred} className="flex items-start gap-3 text-gray-300">
                    <span className="text-green-500">✓</span>
                    {cred}
                  </li>
                ))}
              </ul>
            </FadeInUp>
          </div>

          <FadeInRight delay={0.3}>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src="/assets/img/about/about.webp"
                  alt="Marcin Kołodziej"
                  width={500}
                  height={600}
                  className="size-full object-cover"
                />
              </div>
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-blue-500/10 via-transparent to-green-500/10 blur-2xl" />
            </div>
          </FadeInRight>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// HOW IT WORKS SECTION
// ============================================================================

export const HowItWorksSection: FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Diagnoza',
      description: 'Analizujemy Twoją obecną sytuację, cele i\u00A0wyzwania. Określamy, gdzie jesteś i\u00A0dokąd chcesz dojść.',
    },
    {
      number: '02',
      title: 'Plan rozwoju',
      description: 'Tworzymy spersonalizowany plan działania - konkretne kroki, które przybliżą Cię do roli managera.',
    },
    {
      number: '03',
      title: 'Praca nad kompetencjami',
      description: 'Rozwijamy kluczowe umiejętności: komunikację, delegowanie, feedback, podejmowanie decyzji.',
    },
    {
      number: '04',
      title: 'Wdrożenie i\u00A0wsparcie',
      description: 'Praktykujesz nowe umiejętności w\u00A0realnych sytuacjach. Jestem z\u00A0Tobą na każdym etapie.',
    },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <FadeInUp>
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Jak to działa?
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-gray-400">
            Cały proces oparty jest na praktyce. Każdy krok przybliża Cię do celu.
          </p>
        </FadeInUp>

        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
          {steps.map(step => (
            <StaggerItem key={step.number}>
              <motion.div
                className="h-full rounded-2xl border border-white/10 bg-white/5 p-6"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-3xl font-bold text-green-500">{step.number}</span>
                <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{step.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

// ============================================================================
// SOCIAL PROOF SECTION
// ============================================================================

export const SocialProofSection: FC = () => {
  const testimonials = [
    {
      quote: 'Praca z\u00A0Marcinem znacząco ukształtowała moje podejście do przywództwa i\u00A0komunikacji. W\u00A0trudnych sytuacjach zachowuje spokój, jasno myśli i\u00A0podejmuje zdecydowane decyzje.',
      author: 'Michał',
      position: 'Tech Lead',
    },
    {
      quote: 'Marcin łączy rozległą wiedzę techniczną z\u00A0efektywnym zarządzaniem ludźmi. Tworzy środowisko sprzyjające nauce, współpracy i\u00A0rozwojowi zespołu.',
      author: 'Kacper',
      position: 'Developer',
    },
    {
      quote: 'Inspirujący lider, który wnosi przejrzystość, autentyczną troskę i\u00A0skuteczne podejście do zarządzania.',
      author: 'Eugene',
      position: 'Team Lead',
    },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <FadeInUp>
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Co mówią inni?
          </h2>
        </FadeInUp>

        <StaggerContainer className="mt-12 grid gap-6 lg:grid-cols-3" staggerDelay={0.15}>
          {testimonials.map(t => (
            <StaggerItem key={t.author}>
              <motion.div
                className="h-full rounded-2xl border border-white/10 bg-white/5 p-6"
                whileHover={{ borderColor: 'rgba(34, 197, 94, 0.3)' }}
                transition={{ duration: 0.2 }}
              >
                <p className="italic text-gray-300">
                  {t.quote}
                </p>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <p className="font-medium text-white">{t.author}</p>
                  <p className="text-sm text-gray-500">{t.position}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

// ============================================================================
// CTA SECTION
// ============================================================================

export const CTASection: FC = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <FadeInUp>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-green-500/10 to-indigo-500/10 p-8 sm:p-12">
            <div className="relative z-10 text-center">
              <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                Rozważasz kolejny krok?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
                Przejście z&nbsp;roli technicznej do managera to jedno z&nbsp;największych wyzwań
                w&nbsp;karierze inżyniera. Nie musisz robić tego samodzielnie.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <ButtonLink href="/oferta">
                  Zobacz ofertę
                </ButtonLink>
                <ButtonLink href="mailto:hello@codestorybro.com" variant="outline">
                  Napisz do mnie
                </ButtonLink>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-green-500/5" />
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};

// ============================================================================
// FAQ SECTION (New version)
// ============================================================================

export const FAQSection: FC = () => {
  const faqs = [
    {
      q: 'Czy muszę mieć doświadczenie w\u00A0zarządzaniu?',
      a: 'Nie. Pracuję głównie z\u00A0osobami, które dopiero planują przejście do roli managera lub są na jej początku.',
    },
    {
      q: 'Czy technologia, w\u00A0której pracuję, ma znaczenie?',
      a: 'Nie. Skupiam się na kompetencjach managerskich i\u00A0leaderskich, nie na konkretnych stackach technologicznych.',
    },
    {
      q: 'Ile czasu zajmuje taka transformacja?',
      a: 'Wiele zależy od Twojej sytuacji wyjściowej, celów oraz zaangażowania w\u00A0proces. Natomaist rozmawiamy tutaj raczej o\u00A0miesiącach niż tygodniach. To nie sprint, lecz maraton.',
    },
    {
      q: 'Czy to jest dla osób z\u00A0korporacji czy startupów?',
      a: 'Dla obu. Wyzwania managera są podobne, różni się kontekst, zasoby i\u00A0skala. Dostosowuję podejście do Twojej sytuacji.',
    },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <FadeInUp>
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Często zadawane pytania
          </h2>
        </FadeInUp>

        <StaggerContainer className="mt-12 space-y-4" staggerDelay={0.1}>
          {faqs.map(faq => (
            <StaggerItem key={faq.q}>
              <motion.div
                className="rounded-xl border border-white/10 bg-white/5 p-6"
                whileHover={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-lg font-semibold text-white">{faq.q}</h3>
                <p className="mt-2 text-gray-400">{faq.a}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
