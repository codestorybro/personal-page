'use client';

import type { FC } from 'react';
import { SealCheckIcon } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const SubscriptionConfirmed: FC = () => {
  return (
    <motion.div
      className="my-8 flex flex-col items-center gap-4"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full bg-green-500/20 p-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
      >
        <SealCheckIcon size={48} weight="fill" className="text-green-500" />
      </motion.div>
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <p className="text-xl font-bold text-white">Subskrypcja potwierdzona!</p>
        <p className="text-gray-400">
          Bum! Twój email został oficjalnie potwierdzony i znajdujesz się na liście.
        </p>
      </motion.div>
      <motion.div
        className="mt-2 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <p className="text-center text-sm text-green-400">Dziękuję za zapisanie się do newslettera</p>
      </motion.div>
    </motion.div>
  );
};

export default SubscriptionConfirmed;
