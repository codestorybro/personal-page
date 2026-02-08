'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export function NavigationProgress() {
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  // Complete navigation when pathname changes
  useEffect(() => {
    if (isNavigating) {
      // Clear interval
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }

      // Jump to 100%
      setProgress(100);

      // Hide after animation
      const timeout = setTimeout(() => {
        setIsNavigating(false);
        setProgress(0);
      }, 300);

      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleStart = (url: string) => {
      // Don't start if navigating to the same page
      if (url === window.location.href) {
        return;
      }

      setIsNavigating(true);
      setProgress(0);

      // Simulate progress
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            return prev;
          }
          // Slow down as we approach 90%
          const increment = Math.max(1, (90 - prev) / 10);
          return Math.min(90, prev + increment);
        });
      }, 100);
    };

    // Listen for link clicks to internal pages
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (
        link
        && link.href
        && link.href.startsWith(window.location.origin)
        && !link.href.includes('#')
        && !link.target
        && !e.ctrlKey
        && !e.metaKey
      ) {
        handleStart(link.href);
      }
    };

    // Listen for popstate (back/forward navigation)
    const handlePopState = () => {
      setIsNavigating(true);
      setProgress(0);

      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            return prev;
          }
          const increment = Math.max(1, (90 - prev) / 10);
          return Math.min(90, prev + increment);
        });
      }, 100);
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('popstate', handlePopState);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          className="fixed left-0 top-0 z-[100] h-1 bg-indigo-500"
          initial={{ width: '0%', opacity: 1 }}
          animate={{ width: `${progress}%`, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          style={{
            boxShadow: '0 0 10px rgba(99, 102, 241, 0.7), 0 0 5px rgba(99, 102, 241, 0.5)',
          }}
        />
      )}
    </AnimatePresence>
  );
}
