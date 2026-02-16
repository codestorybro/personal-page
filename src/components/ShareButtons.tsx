'use client';

import type { FC } from 'react';
import { FacebookLogoIcon, LinkedinLogoIcon, XLogoIcon } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

type ShareButtonsProps = {
  url: string;
  title: string;
  translations: {
    share: string;
  };
};

export const ShareButtons: FC<ShareButtonsProps> = ({ url, title, translations: t }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: FacebookLogoIcon,
      color: 'hover:text-blue-500',
    },
    {
      name: 'X (Twitter)',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: XLogoIcon,
      color: 'hover:text-white',
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: LinkedinLogoIcon,
      color: 'hover:text-blue-400',
    },
  ];

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-gray-400">{t.share}</span>
      <div className="flex gap-2">
        {shareLinks.map(link => (
          <motion.a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${link.name}`}
            className={`group relative rounded-lg p-2 text-gray-400 transition-colors ${link.color} focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Glow effect */}
            <span
              className="pointer-events-none absolute -inset-2 rounded-lg bg-indigo-500 opacity-0 blur-[10px] transition-opacity duration-300 will-change-transform group-hover:opacity-40"
              aria-hidden="true"
              style={{ WebkitTransform: 'translateZ(0)' }}
            />
            <link.icon size={22} weight="regular" className="relative z-10" />
          </motion.a>
        ))}
      </div>
    </div>
  );
};
