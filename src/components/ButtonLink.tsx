import type { FC } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

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

export const ButtonLink: FC<ButtonLinkProps> = ({
  children,
  href,
  glowClassName,
  className,
  target,
  rel,
  size = 'default',
  variant = 'default',
}) => {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:');
  const opensNewTab = href.startsWith('http');
  const combinedClassName = clsx(baseClassName, sizeClassNames[size], variantClassNames[variant], className);

  const content = (
    <>
      <GlowEffect glowClassName={glowClassName} />
      <span className="relative z-10">{children}</span>
    </>
  );

  if (isExternal || href.startsWith('#')) {
    return (
      <a
        href={href}
        target={target || (opensNewTab ? '_blank' : undefined)}
        rel={rel || (opensNewTab ? 'noopener noreferrer' : undefined)}
        className={combinedClassName}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={combinedClassName}>
      {content}
    </Link>
  );
};
