'use client';

import type { FC } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';

const MotionLink = motion.create(Link);

type ButtonProps = {
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  size?: 'default' | 'compact';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  variant?: 'default' | 'outline';
};

type ButtonLinkProps = {
  children: React.ReactNode;
  href: string;
  glowClassName?: string;
  className?: string;
  target?: string;
  rel?: string;
  size?: 'default' | 'compact';
  variant?: 'default' | 'outline';
};

const baseClassName = 'group relative inline-flex cursor-pointer items-center justify-center gap-3 rounded-lg border font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black';

const variantClassNames = {
  default: 'border-[#333333] hover:border-indigo-400/50',
  outline: 'border-white/20 bg-transparent hover:border-white/40 hover:bg-white/5',
};

const sizeClassNames = {
  default: 'px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg',
  compact: 'px-4 py-2.5 text-sm sm:px-5',
};

const scaleTransition = { type: 'tween' as const, duration: 0.3 };

const GlowEffect: FC<{ glowClassName?: string }> = ({ glowClassName }) => (
  <span
    className={clsx(
      'pointer-events-none absolute -inset-2 rounded-lg opacity-0 blur-[20px] transition-opacity duration-300 will-change-transform group-hover:opacity-40',
      glowClassName || 'bg-indigo-500',
    )}
    aria-hidden="true"
    style={{ WebkitTransform: 'translateZ(0)' }}
  />
);

const Button: FC<ButtonProps & { glowClassName?: string }> = ({
  ariaLabel,
  children,
  glowClassName,
  className,
  disabled,
  size = 'default',
  type = 'button',
  onClick,
  variant = 'default',
}) => {
  return (
    <motion.button
      aria-label={ariaLabel}
      className={clsx(baseClassName, sizeClassNames[size], variantClassNames[variant], className)}
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={scaleTransition}
    >
      <GlowEffect glowClassName={glowClassName} />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export const ButtonLink: FC<ButtonLinkProps> = ({ children, href, glowClassName, className, target, rel, size = 'default', variant = 'default' }) => {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:');
  const opensNewTab = href.startsWith('http');
  const isAnchor = href.startsWith('#');
  const combinedClassName = clsx(baseClassName, sizeClassNames[size], variantClassNames[variant], className);

  if (isExternal) {
    return (
      <motion.a
        href={href}
        target={target || (opensNewTab ? '_blank' : undefined)}
        rel={rel || (opensNewTab ? 'noopener noreferrer' : undefined)}
        className={combinedClassName}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={scaleTransition}
      >
        <GlowEffect glowClassName={glowClassName} />
        <span className="relative z-10">{children}</span>
      </motion.a>
    );
  }

  if (isAnchor) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return (
      <motion.a
        href={href}
        onClick={handleClick}
        className={combinedClassName}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={scaleTransition}
      >
        <GlowEffect glowClassName={glowClassName} />
        <span className="relative z-10">{children}</span>
      </motion.a>
    );
  }

  return (
    <MotionLink
      href={href}
      className={combinedClassName}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={scaleTransition}
    >
      <GlowEffect glowClassName={glowClassName} />
      <span className="relative z-10">{children}</span>
    </MotionLink>
  );
};

export default Button;
