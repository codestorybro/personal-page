'use client';

import type { FC } from 'react';
import { motion } from 'framer-motion';
import { FadeInUp, StaggerContainer, StaggerItem } from './AnimatedElements';
import { ButtonLink } from './Button';

export { BlogBridge } from './BlogBridge';

// ============================================================================
// HERO SECTION
// ============================================================================

export const HeroSection: FC = () => {
  return (
    <section className="py-12 sm:py-20 lg:py-32">
      <div className="flex flex-col items-center text-center">
        <FadeInUp delay={0.2}>
          <div className="relative mb-6 w-fit">
            <div
              className="pointer-events-none absolute -inset-4 bg-indigo-500/40 blur-3xl will-change-transform"
              aria-hidden="true"
              style={{ WebkitTransform: 'translateZ(0)' }}
            />
            <h1 className="relative text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
              Mówię głośno to, co
              <span className="mt-2 block bg-gradient-to-r from-red-500 via-amber-400 to-orange-500 bg-clip-text pb-4 text-transparent">
                połowa branży myśli po&nbsp;cichu.
              </span>
            </h1>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.4}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
            Wypalenie. Puste sprinty. Utrata sensu. Fake&apos;owe sukcesy na&nbsp;LinkedInie.
            Jeśli czujesz, że coś w&nbsp;IT śmierdzi to nie jesteś sam.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-400">
            Jestem Marcin. I&nbsp;mówię o&nbsp;tym otwarcie, bo ktoś w&nbsp;końcu musi.
          </p>
        </FadeInUp>

        <FadeInUp delay={0.6}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <ButtonLink href="https://linkedin.com/in/codestorybro" glowClassName="bg-blue-500">
              Dołącz do mnie na LinkedIn →
            </ButtonLink>
            <ButtonLink href="https://youtube.com/@codestorybro" glowClassName="bg-red-500" variant="outline">
              YouTube się kroi, ale bądź na bieżąco →
            </ButtonLink>
            {/* <span className="text-sm text-gray-500">
              YouTube? Się kroi. Bądź na bieżąco.
            </span> */}
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
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <FadeInUp>
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Budzik. Stand-up. Jira. Commit. Powtórz?
          </h2>
        </FadeInUp>

        <div className="mt-10 space-y-6">
          <FadeInUp delay={0.1}>
            <p className="text-lg leading-relaxed text-gray-300">
              Kiedyś programowanie dawało Ci kopa. Rozwiązywałeś problemy, budowałeś rzeczy, które miały sens. A&nbsp;teraz?
            </p>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <p className="text-lg leading-relaxed text-gray-300">
              Teraz przesuwasz tickety. Gonisz velocity. Siedzisz na spotkaniach, które mogły być mailem.
              I&nbsp;gdzieś w&nbsp;środku czujesz pustkę, na którą brakuje Ci słów.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.3}>
            <p className="text-xl font-semibold text-white">
              Nie jesteś sam. To nie jest Twój problem. To jest problem całej branży.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.4}>
            <div className="my-8 border-l-2 border-amber-500/50 pl-6">
              <p className="text-lg leading-relaxed text-gray-300">
                A&nbsp;potem przyszło AI. I&nbsp;wielu ludzi wpadło w&nbsp;panikę: &bdquo;Zastąpią nas! Koniec programistów!&rdquo;
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-300">
                Prawda? AI niczego nie zepsuło. AI było katalizatorem zmiany.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-300">
                Pokazało, że liczenie linijek kodu nigdy nie było wartością. Że bezmyślne dowożenie sprintów nigdy nie było tym,
                o&nbsp;co naprawdę chodzi. Że jeśli Twoja praca sprowadza się do tego, co wkrótce zrobi maszyna to
                {' '}
                <span className="font-semibold text-white">problem istniał na długo przed ChatGPT.</span>
              </p>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.6}>
            <p className="text-xl font-bold text-amber-400">
              Masz dość? Ja też.
            </p>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// TRANSFORMATION SECTION
// ============================================================================

export const TransformationSection: FC = () => {
  const shifts = [
    {
      from: 'Jestem klepaczem kodu',
      to: 'zrozumienie, że Twoja wartość to sposób myślenia, nie ilość commitów',
    },
    {
      from: 'Nie wiem, po co to robię',
      to: 'jasność, czego tak naprawdę szukasz — w\u00A0pracy i\u00A0poza nią',
    },
    {
      from: 'Muszę być na bieżąco z\u00A0każdą technologią',
      to: 'spokój, że Twoja głowa jest ważniejsza niż Twój stack',
    },
    {
      from: 'Boję się, że AI mnie zastąpi',
      to: 'przekonanie, że maszyna nie zastąpi kogoś, kto myśli, pyta i\u00A0kwestionuje',
    },
    {
      from: 'Nie mam głosu w\u00A0tej branży',
      to: 'odwaga, żeby publicznie mówić to, co myślisz',
    },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <FadeInUp>
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Przestajesz być code monkey.
            <span className="mt-2 block text-green-400">Zaczynasz rozumieć swoją realną wartość.</span>
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.15}>
          <p className="mt-6 text-lg text-gray-400">
            Nie sprzedaję Ci frameworka na życie. Nie mam 5-krokowego planu na sukces. I&nbsp;na pewno nie powiem Ci, żebyś po prostu się przebranżowił.
          </p>
          <p className="mt-4 text-lg font-medium text-white">
            To, co dostajesz, to zmiana perspektywy:
          </p>
        </FadeInUp>

        <div className="mt-10 space-y-4">
          {shifts.map((s, index) => (
            <FadeInUp key={s.from} delay={0.2 + index * 0.1}>
              <div className="grid items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 sm:grid-cols-[1fr,auto,1fr] sm:gap-8 sm:p-6">
                <div className="text-gray-400">
                  <span className="text-xs uppercase tracking-wider text-red-400/70">Teraz</span>
                  <p className="mt-1">{s.from}</p>
                </div>
                <div className="hidden text-2xl text-green-500 sm:block">→</div>
                <div className="border-t border-white/10 pt-4 text-white sm:border-0 sm:pt-0">
                  <span className="text-xs uppercase tracking-wider text-green-500">Zmiana</span>
                  <p className="mt-1 font-medium">{s.to}</p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>

        <FadeInUp delay={0.8}>
          <p className="mt-10 text-lg text-gray-400">
            Zmiana firmy nie jest rozwiązaniem. Chodzi o&nbsp;to, żebyś przestał żyć na autopilocie
            i&nbsp;zaczął świadomie decydować, kim chcesz być w&nbsp;tech.
          </p>
        </FadeInUp>
      </div>
    </section>
  );
};

// ============================================================================
// SPEAKER SECTION
// ============================================================================

export const SpeakerSection: FC = () => {
  const testimonials = [
    {
      quote: 'Najlepsza prelekcja na całej konferencji. Nareszcie ktoś mówi o\u00A0tym, o\u00A0czym wszyscy myślimy.',
      author: 'Maciek',
      event: 'Boiling Frogs 2026',
    },
    {
      quote: 'Marcin nie prezentuje tylko uderza. Sala pełna, a\u00A0była cicho, co na konferencji IT graniczy z\u00A0cudem.',
      author: 'Monika',
      event: 'Boiling Frogs 2026',
    },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <FadeInUp>
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Nie czytam slajdów.
            <span className="mt-2 block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Przynoszę ogień.</span>
          </h2>
        </FadeInUp>

        <div className="mt-10 space-y-6">
          <FadeInUp delay={0.1}>
            <p className="text-lg leading-relaxed text-gray-300">
              Konferencje IT mają problem. Kolejny talk o&nbsp;mikroserwisach. Kolejna prezentacja niemal czytana z&nbsp;ekranu, w dodatku monotonnym głosem.
              Kolejna sala wyciągająca telefony po trzecim slajdzie.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <p className="text-xl font-semibold text-white">
              Moje prelekcje to coś innego.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.3}>
            <p className="text-lg leading-relaxed text-gray-300">
              Wchodzę na scenę, żeby ludzie poczuli. Żeby pokiwali głową i&nbsp;pomyśleli:
              &bdquo;Też to czuję, ktoś wreszcie to powiedział.&rdquo; Żeby wyszli z&nbsp;sali z&nbsp;czymś więcej niż kolejne zdjęcie na LinkedIn.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.4}>
            <p className="text-lg leading-relaxed text-gray-300">
              Mówię o&nbsp;wypaleniu. O&nbsp;utracie sensu. O&nbsp;tym, że branża tech sprzedaje iluzję,
              a&nbsp;Ty masz prawo to kwestionować. Surowo, energicznie i&nbsp;bez owijania w&nbsp;bawełnę.
            </p>
          </FadeInUp>
        </div>

        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2" staggerDelay={0.15}>
          {testimonials.map((t, i) => (
            <StaggerItem key={`${t.author}-${i}`}>
              <motion.div
                className="h-full rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6"
                whileHover={{ borderColor: 'rgba(249, 115, 22, 0.4)' }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-2xl">🔥</span>
                <p className="mt-3 italic text-gray-300">
                  {t.quote}
                </p>
                <p className="mt-4 text-sm text-gray-500">
                  {t.author}
                  ,
                  {' '}
                  {t.event}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

// ============================================================================
// FINAL CTA SECTION
// ============================================================================

export const CTASection: FC = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <FadeInUp>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-red-500/10 via-amber-500/10 to-orange-500/10 p-8 sm:p-12">
            <div className="relative z-10 text-center">
              <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                Mało kto o&nbsp;tym mówi.
              </h2>
              <p className="mx-auto mt-2 text-xl font-medium text-amber-400 sm:text-2xl">
                A&nbsp;powinien.
              </p>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
                O&nbsp;rzeczach, o&nbsp;których w&nbsp;branży mówi się szeptem albo wcale.
                Jeśli czujesz, że to o&nbsp;Tobie - dołącz na LinkedIn. Publikuję regularnie i&nbsp;piszę to co myślę.
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold text-white">
                Nie musisz się ze mną zgadzać, ale jeżeli skłoniłem Cię do myślenia - to już coś.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <ButtonLink href="https://linkedin.com/in/codestorybro" glowClassName="bg-blue-500">
                  Obserwuj mnie na LinkedIn →
                </ButtonLink>
                <ButtonLink href="mailto:hello@codestorybro.com" glowClassName="bg-yellow-500">
                  Szukasz prelegenta? Napisz →
                </ButtonLink>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5" />
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};
