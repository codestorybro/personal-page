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

const sizeClassNames = {
  default: 'px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg',
  compact: 'px-4 py-2.5 text-sm sm:px-5',
};

const Button: FC<ButtonProps> = ({
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
      className={clsx('editorial-button cursor-pointer disabled:cursor-not-allowed disabled:opacity-50', variant === 'outline' && 'editorial-button-outline', sizeClassNames[size], className)}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
