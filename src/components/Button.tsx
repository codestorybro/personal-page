'use client';

import type { FC } from 'react';
import clsx from 'clsx';

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

const baseClassName = 'group relative inline-flex cursor-pointer items-center justify-center gap-3 rounded-lg border font-medium text-white transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black';

const variantClassNames = {
  default: 'border-[#333333] hover:border-indigo-400/50',
  outline: 'border-white/20 bg-transparent hover:border-white/40 hover:bg-white/5',
};

const sizeClassNames = {
  default: 'px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg',
  compact: 'px-4 py-2.5 text-sm sm:px-5',
};

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
    <button
      aria-label={ariaLabel}
      className={clsx(baseClassName, sizeClassNames[size], variantClassNames[variant], className)}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      <GlowEffect glowClassName={glowClassName} />
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;
