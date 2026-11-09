import type { FC } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

type ButtonLinkProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
  target?: string;
  rel?: string;
  size?: 'default' | 'compact';
  variant?: 'default' | 'outline';
};

const sizeClassNames = {
  default: 'px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg',
  compact: 'px-4 py-2.5 text-sm sm:px-5',
};

export const ButtonLink: FC<ButtonLinkProps> = ({
  children,
  href,
  className,
  target,
  rel,
  size = 'default',
  variant = 'default',
}) => {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:');
  const opensNewTab = href.startsWith('http');
  const combinedClassName = clsx('editorial-button', variant === 'outline' && 'editorial-button-outline', sizeClassNames[size], className);

  if (isExternal || href.startsWith('#')) {
    return (
      <a
        href={href}
        target={target || (opensNewTab ? '_blank' : undefined)}
        rel={rel || (opensNewTab ? 'noopener noreferrer' : undefined)}
        className={combinedClassName}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={combinedClassName}>
      {children}
    </Link>
  );
};
