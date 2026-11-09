'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.IntersectionObserver || !Element.prototype.animate || !window.matchMedia) {
      return;
    }

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches) {
      return;
    }

    const animations = new Set<Animation>();
    const observer = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) {
          continue;
        }

        observer.unobserve(target);
        if (motion.matches || target.matches(':focus-within')) {
          continue;
        }

        const animation = target.animate([
          { opacity: 0.6, transform: 'translateY(10px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ], { duration: 420, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });

        animations.add(animation);
        animation.finished.then(
          () => animations.delete(animation),
          () => animations.delete(animation),
        );
      }
    });

    for (const target of document.querySelectorAll('#main-content [data-reveal]')) {
      if (target.getBoundingClientRect().top >= window.innerHeight) {
        observer.observe(target);
      }
    }

    function stopAnimations() {
      for (const animation of animations) {
        animation.cancel();
      }
    }

    motion.addEventListener('change', stopAnimations);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', stopAnimations);
      stopAnimations();
    };
  }, [pathname]);

  return null;
}
