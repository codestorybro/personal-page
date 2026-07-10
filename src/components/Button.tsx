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

const baseClassName = 'group relative inline-flex cursor-pointer items-center justify-center gap-3 rounded-xl border font-medium text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#090b0d] disabled:cursor-not-allowed disabled:opacity-50';

const variantClassNames = {
  default: 'border-cyan-300/30 bg-cyan-300/10 text-cyan-100 hover:border-cyan-200 hover:bg-cyan-300/15',
  outline: 'border-white/20 bg-transparent hover:border-white/40 hover:bg-white/5',
};

const sizeClassNames = {
  default: 'px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg',
  compact: 'px-4 py-2.5 text-sm sm:px-5',
};

const Button: FC<ButtonProps & { glowClassName?: string }> = ({
  ariaLabel,
  children,
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
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;
