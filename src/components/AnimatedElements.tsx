'use client';

import type { ReactNode } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

type AnimatedTextProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const defaultTransition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

// Custom hook for Safari-compatible in-view detection
function useAnimateOnView(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return { ref, controls, delay };
}

// Fade in from bottom animation
export const FadeInUp = ({ children, className = '', delay = 0 }: AnimatedTextProps) => {
  const { ref, controls } = useAnimateOnView(delay);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ ...defaultTransition, delay }}
    >
      {children}
    </motion.div>
  );
};

// Fade in from left animation
export const FadeInLeft = ({ children, className = '', delay = 0 }: AnimatedTextProps) => {
  const { ref, controls } = useAnimateOnView(delay);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
      }}
      transition={{ ...defaultTransition, delay }}
    >
      {children}
    </motion.div>
  );
};

// Fade in from right animation
export const FadeInRight = ({ children, className = '', delay = 0 }: AnimatedTextProps) => {
  const { ref, controls } = useAnimateOnView(delay);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
      }}
      transition={{ ...defaultTransition, delay }}
    >
      {children}
    </motion.div>
  );
};

// Stagger children animation wrapper
type StaggerContainerProps = {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
};

export const StaggerContainer = ({ children, className = '', staggerDelay = 0.1 }: StaggerContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Child item for stagger animation
export const StaggerItem = ({ children, className = '' }: Omit<AnimatedTextProps, 'delay'>) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};
