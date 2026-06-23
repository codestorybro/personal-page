import type { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';

type AnimatedTextProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const animationStyle = (delay: number): CSSProperties => ({
  '--enter-delay': `${delay}s`,
} as CSSProperties);

// Fade in from bottom animation
export const FadeInUp = ({ children, className = '', delay = 0 }: AnimatedTextProps) => {
  return (
    <div
      className={clsx('content-enter', className)}
      style={animationStyle(delay)}
    >
      {children}
    </div>
  );
};

// Fade in from left animation
export const FadeInLeft = ({ children, className = '', delay = 0 }: AnimatedTextProps) => {
  return (
    <div
      className={clsx('content-enter content-enter-left', className)}
      style={animationStyle(delay)}
    >
      {children}
    </div>
  );
};

// Fade in from right animation
export const FadeInRight = ({ children, className = '', delay = 0 }: AnimatedTextProps) => {
  return (
    <div
      className={clsx('content-enter content-enter-right', className)}
      style={animationStyle(delay)}
    >
      {children}
    </div>
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
    <div
      className={clsx('stagger-container', className)}
      style={{
        '--stagger-delay': `${staggerDelay}s`,
      } as CSSProperties}
    >
      {children}
    </div>
  );
};

// Child item for stagger animation
export const StaggerItem = ({ children, className = '' }: Omit<AnimatedTextProps, 'delay'>) => {
  return (
    <div className={clsx('stagger-item', className)}>
      {children}
    </div>
  );
};
