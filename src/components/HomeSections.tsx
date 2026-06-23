import type { FC } from 'react';
import { AppConfig } from '@/utils/AppConfig';
import { FadeInUp, StaggerContainer, StaggerItem } from './AnimatedElements';
import { BrandSlogan } from './BrandSlogan';
import { ButtonLink } from './ButtonLink';
import { CopyEmailButton } from './CopyEmailButton';

export { ThreadsBridge } from './ThreadsBridge';

// ============================================================================
// HERO SECTION
// ============================================================================

export const HeroSection: FC = () => {
  return (
    <section className="py-12 sm:py-20 lg:py-32">
      <div className="flex flex-col items-center text-center">
        <FadeInUp delay={0.1}>
          <p className="mb-5 text-sm font-semibold tracking-[0.3em] text-amber-400 sm:text-base">
            <BrandSlogan />
          </p>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <div className="relative mb-6 w-fit">
            <div
              className="pointer-events-none absolute -inset-4 bg-indigo-500/40 blur-3xl will-change-transform"
              aria-hidden="true"
              style={{ WebkitTransform: 'translateZ(0)' }}
            />
            <h1 className="relative text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
              Najtrudniejsze w&nbsp;IT
              <span className="mt-2 block bg-gradient-to-r from-red-500 via-amber-400 to-orange-500 bg-clip-text pb-4 text-transparent">
                rzadko jest techniczne.
              </span>
            </h1>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.35}>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-300">
            Nazywam się Marcin Kołodziej. Jako Engineering Manager mówię o&nbsp;tym, czego świeżych managerów,
            tech leadów i&nbsp;ambitnych ludzi z&nbsp;IT nikt nie uczy wystarczająco wcześnie:
            odpowiedzialności, trudnych rozmów i&nbsp;prowadzenia ludzi.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-relaxed text-white">
            IT to nie tylko kod. To ludzie, decyzje i&nbsp;odpowiedzialność.
          </p>
        </FadeInUp>

        <FadeInUp delay={0.5}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
            <ButtonLink href={AppConfig.social.youtube} glowClassName="bg-red-500">
              Oglądaj na YouTube →
            </ButtonLink>
            <ButtonLink href={AppConfig.social.threads} glowClassName="bg-zinc-300" variant="outline">
              Dyskutuj na Threads →
            </ButtonLink>
            <ButtonLink href={AppConfig.social.linkedin} glowClassName="bg-blue-500" variant="outline">
              Obserwuj na LinkedIn →
            </ButtonLink>
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
            Zespół może dowozić i&nbsp;jednocześnie się rozpadać.
          </h2>
        </FadeInUp>

        <div className="mt-10 space-y-6">
          <FadeInUp delay={0.1}>
            <p className="text-lg leading-relaxed text-gray-300">
              Statusy są zielone. Sprint zamknięty. A&nbsp;jednak ludzie milkną, napięcie rośnie,
              a&nbsp;najważniejsze problemy nie trafiają ani na daily, ani do raportu.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <p className="text-lg leading-relaxed text-gray-300">
              Świeży manager często próbuje dalej być najlepszym devem. Bierze za dużo na siebie,
              odkłada feedback i&nbsp;liczy, że trudna sytuacja rozwiąże się sama. Nie rozwiąże.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.3}>
            <p className="text-xl font-semibold text-white">
              Prowadzenie ludzi zaczyna się tam, gdzie kończy się kod.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.4}>
            <div className="my-8 border-l-2 border-amber-500/50 pl-6">
              <p className="text-xl font-semibold text-amber-400">
                Trudne rozmowy nie znikają. One tylko drożeją.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-300">
                Feedback przekazany miesiąc za późno kosztuje zaufanie. Konflikt ignorowany przez kwartał
                kosztuje energię całego zespołu. Awans potraktowany jak nagroda zamiast zmiany odpowiedzialności
                szybko wystawia rachunek.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-300">
                Brak problemów nie zawsze oznacza zdrowy zespół. Czasem oznacza tylko,
                że ludzie przestali wierzyć, że warto o&nbsp;nich mówić.
              </p>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.55}>
            <p className="text-xl font-bold text-white">
              Dobry manager widzi więcej niż delivery.
            </p>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// LEADERSHIP SECTION
// ============================================================================

export const LeadershipSection: FC = () => {
  const shifts = [
    {
      from: 'Muszę mieć odpowiedź na wszystko.',
      to: 'Zadajesz lepsze pytania i\u00A0nie udajesz nieomylnego.',
    },
    {
      from: 'Chcę, żeby wszyscy mnie lubili.',
      to: 'Budujesz zaufanie przez jasność, uczciwość i\u00A0konsekwencję.',
    },
    {
      from: 'Zespół dowozi, więc jest dobrze.',
      to: 'Patrzysz także na energię, napięcia, rozwój i\u00A0współpracę.',
    },
    {
      from: 'Jeszcze poczekam z\u00A0feedbackiem.',
      to: 'Rozmawiasz wcześnie, konkretnie i\u00A0z\u00A0szacunkiem.',
    },
    {
      from: 'Sam zrobię to szybciej.',
      to: 'Oddajesz odpowiedzialność i\u00A0pomagasz ludziom rosnąć.',
    },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <FadeInUp>
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Awans to nie nagroda.
            <span className="mt-2 block text-green-400">To zmiana odpowiedzialności.</span>
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.15}>
          <p className="mt-6 text-lg text-gray-300">
            To, co zrobiło z&nbsp;Ciebie dobrego developera, nie wystarczy, żeby dobrze prowadzić ludzi.
            Rola managera wymaga nowego sposobu patrzenia na zespół i&nbsp;komunikację oraz zmiany perspektywy.
          </p>
          <p className="mt-4 text-lg font-medium text-white">
            Tutaj pracuję nad zmianami, które naprawdę robią różnicę:
          </p>
        </FadeInUp>

        <div className="mt-10 space-y-4">
          {shifts.map((shift, index) => (
            <FadeInUp key={shift.from} delay={0.2 + index * 0.08}>
              <div className="grid items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 sm:grid-cols-[1fr,auto,1fr] sm:gap-8 sm:p-6">
                <div className="text-gray-400">
                  <span className="text-xs uppercase tracking-wider text-red-400/70">Pułapka</span>
                  <p className="mt-1">{shift.from}</p>
                </div>
                <div className="hidden text-2xl text-green-500 sm:block">→</div>
                <div className="border-t border-white/10 pt-4 text-white sm:border-0 sm:pt-0">
                  <span className="text-xs uppercase tracking-wider text-green-500">Dojrzały ruch</span>
                  <p className="mt-1 font-medium">{shift.to}</p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>

        <FadeInUp delay={0.75}>
          <p className="mt-10 text-lg text-gray-400">
            Bez coachingowych sloganów. Z&nbsp;konkretem z&nbsp;pracy z&nbsp;ludźmi,
            błędami, które bolą, i&nbsp;decyzjami, których nie da się delegować do procedury.
          </p>
        </FadeInUp>
      </div>
    </section>
  );
};

// ============================================================================
// CONTENT SERIES SECTION
// ============================================================================

export const SeriesSection: FC = () => {
  const series = [
    {
      title: 'Błędy świeżego managera',
      description: 'O pułapkach po awansie: kontroli, potrzebie bycia lubianym i\u00A0unikaniu odpowiedzialności.',
    },
    {
      title: 'Jak manager widzi…',
      description: 'Daily, konflikty, seniorów, hybrydę i\u00A0cichy zespół z\u00A0perspektywy osoby odpowiedzialnej za całość.',
    },
    {
      title: 'Trudne rozmowy',
      description: 'Feedback, brak wyników, napięcia, awanse i\u00A0pieniądze - bez magicznych skryptów i\u00A0unikania sedna.',
    },
    {
      title: 'Branża od środka',
      description: 'Mechanizmy IT, których nie widać w\u00A0statusach: polityka, presja, delivery i\u00A0kultura pracy.',
    },
    {
      title: 'Manager też człowiek',
      description: 'Presja, samotność, zmęczenie decyzjami i\u00A0emocje po drugiej stronie managerskiej roli.',
    },
  ];

  return (
    <section id="serie" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <FadeInUp>
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Tematy, których nie uczą Cię po awansie.
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-400">
            Pomagam lepiej zrozumieć pracę managera IT, prowadzenie zespołu
            i&nbsp;rozmowy, od których zależy więcej niż od kolejnego procesu. Serie, które prowadzę, to między innymi:
          </p>
        </FadeInUp>

        <StaggerContainer className="mt-10 grid gap-5 md:grid-cols-2" staggerDelay={0.08}>
          {series.map((item, index) => (
            <StaggerItem key={item.title}>
              <article className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 transition duration-200 hover:-translate-y-1 hover:border-indigo-400/40">
                <p className="text-sm font-semibold text-indigo-400">
                  0
                  {index + 1}
                </p>
                <h3 className="mt-3 text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-400">{item.description}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeInUp delay={0.3}>
          <div className="mt-10">
            <ButtonLink href="https://youtube.com/@codestorybro" glowClassName="bg-red-500">
              Oglądaj na YouTube →
            </ButtonLink>
          </div>
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
      event: 'Boiling Frogs Conference',
    },
    {
      quote: 'Marcin nie prezentuje, tylko uderza. Sala pełna, a\u00A0było cicho, co na konferencji IT graniczy z\u00A0cudem.',
      author: 'Monika',
      event: '4Developers Warsaw',
    },
  ];

  return (
    <section id="wystapienia" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <FadeInUp>
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Tematy, które ludzie z&nbsp;IT czują,
            <span className="mt-2 block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text pb-1 text-transparent">
              ale rzadko nazywają publicznie.
            </span>
          </h2>
        </FadeInUp>

        <div className="mt-10 space-y-6">
          <FadeInUp delay={0.1}>
            <p className="text-lg leading-relaxed text-gray-300">
              Występuję na ogólnopolskich konferencjach, meetupach i&nbsp;eventach firmowych. Mówię o&nbsp;leadershipie w&nbsp;IT,
              odpowiedzialności managera, trudnych rozmowach i&nbsp;ludzkiej stronie zespołów technologicznych.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <p className="text-xl font-semibold text-white">
              Zero czytania slajdów. Zero keynote&apos;u zbudowanego z&nbsp;buzzwordów.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.3}>
            <p className="text-lg leading-relaxed text-gray-300">
              Są konkrety z&nbsp;pracy z&nbsp;zespołami, żywa energia i&nbsp;historie, w&nbsp;których ludzie rozpoznają
              własne daily, konflikty i&nbsp;rozmowy odkładane o&nbsp;tydzień za długo.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.4}>
            <div className="pt-2">
              <CopyEmailButton glowClassName="bg-orange-500">
                Zaproś mnie na konferencję lub event →
              </CopyEmailButton>
            </div>
          </FadeInUp>
        </div>

        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2" staggerDelay={0.15}>
          {testimonials.map(testimonial => (
            <StaggerItem key={`${testimonial.author}-${testimonial.event}`}>
              <div className="h-full rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6 transition-colors duration-200 hover:border-orange-500/40">
                <p className="mt-3 italic text-gray-300">
                  {testimonial.quote}
                </p>
                <p className="mt-4 text-sm text-gray-500">
                  {testimonial.author}
                  ,
                  {' '}
                  {testimonial.event}
                </p>
              </div>
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
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-blue-500/10 p-8 sm:p-12">
            <div className="relative z-10 text-center">
              <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                Prowadź ludzi świadomie.
              </h2>
              <p className="mx-auto mt-2 text-xl font-medium text-amber-400 sm:text-2xl">
                Nie tylko dowoź taski.
              </p>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
                Jeśli jesteś managerem IT, tech leadem albo stoisz przed awansem,
                zostań na dłużej. Rozmawiamy tu o&nbsp;tym, co naprawdę dzieje się między ludźmi, decyzjami i&nbsp;delivery.
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold text-white">
                Z&nbsp;odpowiedzialnością za słowa i&nbsp;decyzje.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
                <ButtonLink href={AppConfig.social.linkedin} glowClassName="bg-blue-500">
                  Obserwuj na LinkedIn →
                </ButtonLink>
                <ButtonLink href={AppConfig.social.youtube} glowClassName="bg-red-500" variant="outline">
                  Zobacz YouTube →
                </ButtonLink>
                <ButtonLink href={AppConfig.social.threads} glowClassName="bg-zinc-300" variant="outline">
                  Dyskutuj na Threads →
                </ButtonLink>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5" />
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};
