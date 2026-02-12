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
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col justify-center">

          <FadeInLeft delay={0.2}>
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Od Developera
              <span className="mt-2 block bg-gradient-to-r from-blue-500 via-green-400 to-indigo-500 bg-clip-text pb-4 text-transparent">
                do Engineering Managera
              </span>
            </h1>
          </FadeInLeft>

          <FadeInUp delay={0.4}>
            <p className="mt-6 text-lg leading-relaxed text-gray-300">
              Pomagam świadomym developerom przejść z ról wykonawczych do zarządzania zespołami.
              Z perspektywy kogoś, kto sam przeszedł całą tę ścieżkę.
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

        <FadeInRight delay={0.3}>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/assets/img/hero/4.webp"
                alt="Marcin Kołodziej - CodeStoryBro"
                width={600}
                height={700}
                className="size-full object-cover"
                priority
              />
            </div>
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-blue-500/20 via-transparent to-green-500/20 blur-2xl" />
          </div>
        </FadeInRight>
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
      description: 'Masz za sobą parę lat doświadczenia i czujesz, że pisanie kodu to już za mało. Szukasz czegoś więcej. Zaczynasz myśleć o wpływie, procesach i ludziach.',
      icon: '🎯',
    },
    {
      title: 'Tech/Team Lead',
      description: 'Już prowadzisz technicznie zespół, ale chcesz rozwinąć kompetencje managerskie lub po prostu napotykasz na wyzwania związane z zarządzaniem ludźmi.',
      icon: '🧭',
    },
  ];

  const notFor = [
    'zorientowania na konkretną technologię - CodeStoryBro jest w pełni framework agnostic',
    'magicznych hacków na szybki awans - zaufaj mi, nie chcesz być managerem, który awansował bez przygotowania z dnia na dzień',
  ];

  return (
    <section id="dla-kogo" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <FadeInUp>
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Dla kogo jest CodeStoryBro?
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-gray-400">
            Pracuję z inżynierami na określonym etapie kariery - tymi, którzy są gotowi
            na przejście z wykonawstwa do przywództwa.
          </p>
        </FadeInUp>

        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
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
    'Jesteś świetny technicznie, ale nikt nie nauczył Cię zarządzać ludźmi.',
    'Nie wiesz, jak rozmawiać z biznesem - i czujesz, że tracisz na tym wpływ.',
    'Boisz się, że jako manager stracisz kontakt z technologią.',
    'Delegowanie wydaje Ci się trudniejsze niż napisanie kodu samemu.',
    'Bugi w kodzie łatwo naprawić, ale trudne rozmowy z zespołem z jakiegoś powodu odkładasz na później.',
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
            Większość seniorów nie ma problemu z kodem. Challenge zaczyna się,
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
      to: 'Projektujesz rozwiązania i rozwijasz ludzi',
    },
    {
      from: 'Realizujesz zadania',
      to: 'Ustalasz priorytety i podejmujesz decyzje',
    },
    {
      from: 'Pracujesz w zespole',
      to: 'Budujesz i prowadzisz zespół',
    },
    {
      from: 'Mówisz językiem technologii',
      to: 'Komunikujesz się z biznesem',
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
            W mojej opinii, przejście do roli managera to zmiana mindsetu, a nie zwykły awans.
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
    { role: 'Intern', desc: 'Zaczynałem od podstaw' },
    { role: 'Junior', desc: 'Uczyłem się na błędach' },
    { role: 'Mid', desc: 'Brałem odpowiedzialność' },
    { role: 'Senior', desc: 'Projektowałem rozwiązania' },
    { role: 'Staff', desc: 'Wpływałem na architekturę' },
    { role: 'Manager', desc: 'Prowadzę zespoły' },
  ];

  const credentials = [
    'Wykładowca na kursach prywatnych oraz uczelni wyższej',
    'Rekruter techniczny - rozumiem proces z perspektywy firmy i kandydata',
    'Prelegent na ogólnopolskich konferencjach IT',
    'Lider budujący i prowadzący zespoły produktowe',
    'Współpraca z firmami z Europy, USA i Bliskiego Wschodu - od startupów po korporacje',
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
                Jestem pragmatykiem. Sporo czytam, ale nie uczę prosto z książek. Mówię z doświadczenia, bo sam przeszedłem każdy etap,
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
                    <span className="rounded-full bg-gradient-to-r from-blue-500 to-green-500 px-3 py-1 text-sm font-medium text-white">
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
      description: 'Analizujemy Twoją obecną sytuację, cele i wyzwania. Określamy, gdzie jesteś i dokąd chcesz dojść.',
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
      title: 'Wdrożenie i wsparcie',
      description: 'Praktykujesz nowe umiejętności w realnych sytuacjach. Jestem z Tobą na każdym etapie.',
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
      quote: 'Praca z Marcinem znacząco ukształtowała moje podejście do przywództwa i komunikacji. W trudnych sytuacjach zachowuje spokój, jasno myśli i podejmuje zdecydowane decyzje.',
      author: 'Michał',
      position: 'Tech Lead',
    },
    {
      quote: 'Marcin łączy rozległą wiedzę techniczną z efektywnym zarządzaniem ludźmi. Tworzy środowisko sprzyjające nauce, współpracy i rozwojowi zespołu.',
      author: 'Kacper',
      position: 'Developer',
    },
    {
      quote: 'Inspirujący lider, który wnosi przejrzystość, autentyczną troskę i skuteczne podejście do zarządzania.',
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
                Gotowy na zmianę?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
                Przejście z roli technicznej do managera to jedno z największych wyzwań
                w karierze inżyniera. Nie musisz robić tego sam.
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
      q: 'Czy muszę mieć doświadczenie w zarządzaniu?',
      a: 'Nie. Pracuję głównie z osobami, które dopiero planują przejście do roli managera lub są na jej początku.',
    },
    {
      q: 'Czy technologia, w której pracuję, ma znaczenie?',
      a: 'Nie. Skupiam się na kompetencjach managerskich i leaderskich, nie na konkretnych stackach technologicznych.',
    },
    {
      q: 'Ile czasu zajmuje taka transformacja?',
      a: 'Wiele zależy od Twojej sytuacji wyjściowej, celów oraz zaangażowania w proces. Natomaist rozmawiamy tutaj raczej o miesiącach niż tygodniach. To nie sprint, lecz maraton.',
    },
    {
      q: 'Czy to jest dla osób z korporacji czy startupów?',
      a: 'Dla obu. Wyzwania managera są podobne, różni się kontekst, zasoby i skala. Dostosowuję podejście do Twojej sytuacji.',
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
