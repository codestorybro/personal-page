'use client';

import type { FC } from 'react';
import { ArrowPathIcon, GlobeEuropeAfricaIcon, QuestionMarkCircleIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { FadeInUp } from './AnimatedElements';

type Props = {
  principles: Array<{
    name: string;
    description: string;
    iconName: 'UserGroupIcon' | 'GlobeEuropeAfricaIcon' | 'QuestionMarkCircleIcon' | 'ArrowPathIcon';
  }>;
  title: string;
};

const iconMap = {
  UserGroupIcon,
  GlobeEuropeAfricaIcon,
  QuestionMarkCircleIcon,
  ArrowPathIcon,
};

export const PrinciplesClient: FC<Props> = ({ principles, title }) => {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <FadeInUp>
            <motion.h2
              className="mx-auto w-fit bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-[length:200%_auto] bg-clip-text text-base/7 font-semibold text-transparent"
              animate={{
                backgroundPosition: ['0% center', '200% center'],
              }}
              transition={{
                duration: 3,
                ease: 'linear',
                repeat: Infinity,
              }}
            >
              {title}
            </motion.h2>
          </FadeInUp>
        </div>
        <div className="mx-auto mt-6 max-w-2xl lg:max-w-4xl">
          <motion.dl
            className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {principles.map((feature) => {
              const IconComponent = iconMap[feature.iconName];
              return (
                <motion.div
                  key={feature.name}
                  className="relative pl-16"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        ease: [0.25, 0.1, 0.25, 1],
                      },
                    },
                  }}
                  whileHover={{ x: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <dt className="text-2xl font-semibold text-white">
                    <motion.div
                      className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <IconComponent aria-hidden="true" className="size-6 text-white" />
                    </motion.div>
                    {feature.name}
                  </dt>
                  <dd className="mt-3 text-lg text-gray-400">{feature.description}</dd>
                </motion.div>
              );
            })}
          </motion.dl>
        </div>
      </div>
    </div>
  );
};
