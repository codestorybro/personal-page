'use client';
import type { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  locale: string;
};

export const Header: FC<Props> = () => {
  return (
    <motion.div
      className="flex w-full justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link href="/" className="rounded-3xl pr-4 focus:outline-none focus:ring-2 focus-visible:outline-none">
        <motion.div
          className="flex h-22 flex-row items-center focus:outline-none focus-visible:outline-none"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              draggable={false}
              width={50}
              height={68}
              src="/assets/img/logo-main.svg"
              alt="profile"
              priority
            />
          </motion.div>
          <span className="ml-4 font-logoText text-5xl italic text-white" style={{ lineHeight: '95px' }}>
            CodeStoryBro
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
};
