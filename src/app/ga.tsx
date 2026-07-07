'use client';

import { useEffect } from 'react';

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

const GA: React.FC = () => {
  const measurementId = process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID;

  useEffect(() => {
    if (!measurementId) {
      return;
    }

    let timeoutId: number | undefined;
    let idleId: number | undefined;
    let loaded = false;

    const interactionEvents = ['pointerdown', 'keydown', 'touchstart'] as const;

    function cleanupInteractionListeners() {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, loadAnalytics);
      });
    }

    function loadAnalytics() {
      if (loaded || document.querySelector(`script[data-ga-id="${measurementId}"]`)) {
        loaded = true;
        cleanupInteractionListeners();
        return;
      }

      loaded = true;
      cleanupInteractionListeners();

      const gaWindow = window as GtagWindow;
      gaWindow.dataLayer = gaWindow.dataLayer || [];
      gaWindow.gtag = (...args: unknown[]) => {
        gaWindow.dataLayer?.push(args);
      };

      gaWindow.gtag('js', new Date());
      gaWindow.gtag('config', measurementId, {
        page_path: window.location.pathname,
      });

      const script = document.createElement('script');
      script.async = true;
      script.dataset.gaId = measurementId;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);
    }

    const scheduleIdleLoad = () => {
      timeoutId = window.setTimeout(() => {
        if ('requestIdleCallback' in window) {
          idleId = window.requestIdleCallback(loadAnalytics, { timeout: 3000 });
        } else {
          loadAnalytics();
        }
      }, 3500);
    };

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, loadAnalytics, { once: true, passive: true });
    });

    if (document.readyState === 'complete') {
      scheduleIdleLoad();
    } else {
      window.addEventListener('load', scheduleIdleLoad, { once: true });
    }

    return () => {
      cleanupInteractionListeners();
      window.removeEventListener('load', scheduleIdleLoad);

      if (typeof timeoutId === 'number') {
        window.clearTimeout(timeoutId);
      }

      if (typeof idleId === 'number') {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [measurementId]);

  return null;
};

export default GA;
