'use client';

import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { AppConfig } from '@/utils/AppConfig';
import { useState } from 'react';

type CopyEmailButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'onClick' | 'type'> & {
  children: ReactNode;
};

export const CopyEmailButton: FC<CopyEmailButtonProps> = ({ children, className, ...props }) => {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(AppConfig.author.email);
      setStatus('copied');
    } catch {
      setStatus('error');
    }

    window.setTimeout(() => setStatus('idle'), 2400);
  };

  const statusText = status === 'copied'
    ? 'Skopiowano'
    : status === 'error'
      ? 'Nie udało się skopiować'
      : '';

  return (
    <button
      {...props}
      type="button"
      className={className}
      onClick={() => {
        void copyEmail();
      }}
    >
      {children}
      <span className="sr-only" aria-live="polite">
        {statusText}
      </span>
      {status !== 'idle' && (
        <span className="pointer-events-none absolute right-4 top-3 rounded-full border border-white/10 bg-black/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-lg">
          {statusText}
        </span>
      )}
    </button>
  );
};
