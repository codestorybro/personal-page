'use client';

import type { Icon } from '@phosphor-icons/react';
import type { FC } from 'react';
import {
  CheckIcon,
  FacebookLogoIcon,
  LinkedinLogoIcon,
  LinkSimpleIcon,
  RedditLogoIcon,
  ShareNetworkIcon,
  ThreadsLogoIcon,
  XLogoIcon,
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

type ShareButtonsProps = {
  url: string;
  title?: string;
  translations: {
    share: string;
    copied?: string;
    copyLink?: string;
    nativeShare?: string;
  };
};

type ShareIconProps = {
  icon: Icon;
  hoverColor: string;
};

const subscribeToBrowserApi = () => () => {};

const ShareIcon: FC<ShareIconProps> = ({ icon: Icon, hoverColor }) => (
  <>
    <span
      className={`pointer-events-none absolute inset-0 rounded-lg ${hoverColor} opacity-0 blur-[10px] transition-opacity duration-300 will-change-transform group-hover:opacity-40`}
      aria-hidden="true"
      style={{ WebkitTransform: 'translateZ(0)' }}
    />
    <Icon size={22} weight="regular" className="relative z-10" />
  </>
);

export const ShareButtons: FC<ShareButtonsProps> = ({
  url,
  title,
  translations: t,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyResetTimeout = useRef<number | null>(null);
  const supportsNativeShare = useSyncExternalStore(
    subscribeToBrowserApi,
    () => typeof navigator !== 'undefined' && 'share' in navigator,
    () => false,
  );

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title ?? '');

  const shareLinks = [
    {
      name: 'X / Twitter',
      ariaLabel: 'Udostępnij na X / Twitterze',
      href: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: XLogoIcon,
      color: 'hover:text-gray-100',
      hoverColor: 'bg-gray-400',
    },
    {
      name: 'Threads',
      ariaLabel: 'Udostępnij w Threads',
      href: `https://www.threads.net/intent/post?text=${encodedTitle}%20${encodedUrl}`,
      icon: ThreadsLogoIcon,
      color: 'hover:text-gray-100',
      hoverColor: 'bg-gray-400',
    },
    {
      name: 'Reddit',
      ariaLabel: 'Udostępnij na Reddicie',
      href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      icon: RedditLogoIcon,
      color: 'hover:text-orange-100',
      hoverColor: 'bg-orange-500',
    },
    {
      name: 'Facebook',
      ariaLabel: 'Udostępnij na Facebooku',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: FacebookLogoIcon,
      color: 'hover:text-blue-100',
      hoverColor: 'bg-blue-500',
    },
    {
      name: 'LinkedIn',
      ariaLabel: 'Udostępnij na LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: LinkedinLogoIcon,
      color: 'hover:text-blue-100',
      hoverColor: 'bg-blue-500',
    },
  ];

  const copyLinkLabel = t.copyLink ?? 'Kopiuj link';
  const copiedLabel = t.copied ?? 'Skopiowano';
  const nativeShareLabel = t.nativeShare ?? 'Udostępnij systemowo';

  useEffect(() => {
    return () => {
      if (copyResetTimeout.current !== null) {
        window.clearTimeout(copyResetTimeout.current);
      }
    };
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);

      if (copyResetTimeout.current !== null) {
        window.clearTimeout(copyResetTimeout.current);
      }

      copyResetTimeout.current = window.setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch {
      // Clipboard access may be unavailable or denied.
    }
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title, url });
    } catch {
      // Closing or cancelling the native share dialog needs no UI feedback.
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="text-sm font-medium text-gray-400">{t.share}</span>
      <div className="flex flex-wrap gap-2">
        {shareLinks.map(link => (
          <motion.a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.ariaLabel}
            title={link.ariaLabel}
            className={`group relative rounded-lg p-2 text-gray-400 transition-colors ${link.color} focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShareIcon icon={link.icon} hoverColor={link.hoverColor} />
          </motion.a>
        ))}

        <motion.button
          type="button"
          aria-label={isCopied ? copiedLabel : copyLinkLabel}
          title={isCopied ? copiedLabel : copyLinkLabel}
          className="group relative rounded-lg p-2 text-gray-400 transition-colors hover:text-indigo-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopyLink}
        >
          <ShareIcon
            icon={isCopied ? CheckIcon : LinkSimpleIcon}
            hoverColor="bg-indigo-500"
          />
        </motion.button>

        {supportsNativeShare && (
          <motion.button
            type="button"
            aria-label={nativeShareLabel}
            title={nativeShareLabel}
            className="group relative rounded-lg p-2 text-gray-400 transition-colors hover:text-indigo-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNativeShare}
          >
            <ShareIcon
              icon={ShareNetworkIcon}
              hoverColor="bg-indigo-500"
            />
          </motion.button>
        )}

        <span className="sr-only" aria-live="polite">
          {isCopied ? copiedLabel : ''}
        </span>
      </div>
    </div>
  );
};
