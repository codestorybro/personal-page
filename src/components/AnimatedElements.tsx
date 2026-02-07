'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

type AnimatedTextProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

// Fade in from bottom animation
export const FadeInUp = ({ children, className = '', delay = 0 }: AnimatedTextProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

// Fade in from left animation
export const FadeInLeft = ({ children, className = '', delay = 0 }: AnimatedTextProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

// Fade in from right animation
export const FadeInRight = ({ children, className = '', delay = 0 }: AnimatedTextProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

// Scale up animation
export const ScaleIn = ({ children, className = '', delay = 0 }: AnimatedTextProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
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
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
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

// Text reveal animation - letter by letter
type TextRevealProps = {
  text: string;
  className?: string;
  delay?: number;
};

// Generate unique ID for text animation
const generateId = () => Math.random().toString(36).substring(2, 11);

export const TextReveal = ({ text, className = '', delay = 0 }: TextRevealProps) => {
  const words = text.split(' ');
  const uniqueId = generateId();

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.05,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, wordIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <span key={`${uniqueId}-word-${wordIndex}`} className="inline-block">
          {word.split('').map((char, charIndex) => (
            <motion.span
              // eslint-disable-next-line react/no-array-index-key
              key={`${uniqueId}-char-${wordIndex}-${charIndex}`}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.3,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                },
              }}
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
};

// Hover scale effect
type HoverScaleProps = {
  children: ReactNode;
  className?: string;
  scale?: number;
};

export const HoverScale = ({ children, className = '', scale = 1.05 }: HoverScaleProps) => {
  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17,
      }}
    >
      {children}
    </motion.div>
  );
};

// Animated gradient text
type GradientTextProps = {
  children: ReactNode;
  className?: string;
};

export const AnimatedGradientText = ({ children, className = '' }: GradientTextProps) => {
  return (
    <motion.span
      className={`bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-[length:200%_auto] bg-clip-text text-transparent ${className}`}
      animate={{
        backgroundPosition: ['0% center', '200% center'],
      }}
      transition={{
        duration: 3,
        ease: 'linear',
        repeat: Infinity,
      }}
    >
      {children}
    </motion.span>
  );
};

// Floating animation
export const FloatingElement = ({ children, className = '' }: Omit<AnimatedTextProps, 'delay'>) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 3,
        ease: 'easeInOut',
        repeat: Infinity,
      }}
    >
      {children}
    </motion.div>
  );
};
