'use client';

import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FadeInLeft, FadeInUp, StaggerContainer, StaggerItem } from './AnimatedElements';
import { ButtonLink } from './Button';

type HeroSectionProps = {
  translations: {
    sometimes_code_works: string;
    lets_talk_about_it: string;
    loose_stories: string;
    check_my_work: string;
  };
};

export const HeroSection = ({ translations: t }: HeroSectionProps) => {
  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <main className="flex flex-col items-center pb-0 sm:pb-32 lg:flex-row lg:pb-48">
      <div className="w-full lg:w-1/2">
        <FadeInLeft delay={0.2}>
          <h1 className="inline-block text-4xl font-bold text-white lg:text-5xl">
            {t.sometimes_code_works}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-3"
            >
              {t.lets_talk_about_it}
            </motion.p>
          </h1>
        </FadeInLeft>
        <FadeInUp delay={0.6}>
          <p className="mt-6">{t.loose_stories}</p>
        </FadeInUp>
        <FadeInUp delay={0.8}>
          <div className="mt-6 flex space-x-4">
            <ButtonLink href="https://youtube.com/@codestorybro" target="_blank">
              {t.check_my_work}
            </ButtonLink>
          </div>
        </FadeInUp>
      </div>
      <div className="relative mt-0 flex w-full justify-center overflow-hidden py-16 sm:py-0 lg:w-1/2">
        <div className="relative grid items-start gap-[calc(0.25rem*8)] sm:grid-cols-3 lg:translate-x-20">
          <div className="mt-48 hidden justify-center sm:flex">
            <motion.div
              custom={0}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Image draggable={false} alt="hero 1 image" width={160} height={192} src="/assets/img/hero/1.webp" className="h-48 w-40 rounded-xl object-cover shadow-lg" />
            </motion.div>
          </div>
          <div className="mt-16 hidden flex-col sm:flex">
            <motion.div
              custom={1}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Image draggable={false} alt="hero 2 image" width={160} height={256} src="/assets/img/hero/2.webp" className="h-64 w-40 rounded-xl object-cover shadow-lg" />
            </motion.div>
            <motion.div
              custom={2}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="mt-8"
            >
              <Image draggable={false} alt="hero 3 image" width={160} height={256} src="/assets/img/hero/3.webp" className="h-64 w-40 rounded-xl object-cover shadow-lg" />
            </motion.div>
          </div>
          <div className="flex flex-col">
            <motion.div
              custom={3}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Image draggable={false} alt="hero 4 image" width={160} height={256} src="/assets/img/hero/4.webp" className="h-64 w-40 rounded-xl object-cover shadow-lg" />
            </motion.div>
            <motion.div
              custom={4}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="mt-14 hidden sm:block"
            >
              <Image draggable={false} alt="hero 5 image" width={160} height={208} src="/assets/img/hero/5.webp" className="h-52 w-40 rounded-xl object-cover shadow-lg" />
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};

type FAQSectionProps = {
  translations: {
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
  };
};

export const FAQSection = ({ translations: t }: FAQSectionProps) => {
  const faqs = [
    { q: t.q1, a: t.a1 },
    { q: t.q2, a: t.a2 },
    { q: t.q3, a: t.a3 },
  ];

  return (
    <section className="py-10 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <motion.h2
            className="w-fit bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-[length:200%_auto] bg-clip-text font-bold leading-tight text-transparent"
            animate={{
              backgroundPosition: ['0% center', '200% center'],
            }}
            transition={{
              duration: 3,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            FAQ
          </motion.h2>
        </FadeInUp>

        <div className="mt-12 flow-root sm:mt-16">
          <StaggerContainer className="-my-9 divide-y divide-zinc-800" staggerDelay={0.15}>
            {faqs.map((faq, index) => (
              <StaggerItem key={faq.q}>
                <motion.div
                  className={index === 0 ? 'pb-9' : 'py-9'}
                  whileHover={{ x: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <p className="text-2xl font-semibold text-white">{faq.q}</p>
                  <p className="mt-3 text-lg text-gray-400">{faq.a}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};
