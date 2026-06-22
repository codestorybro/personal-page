'use client';

import type { FC } from 'react';
import { ThreadsLogoIcon } from '@phosphor-icons/react';
import clsx from 'clsx';

import { ButtonLink } from './Button';

type BlogThreadsBannerProps = {
  variant: 'list' | 'details';
};

export const BlogThreadsBanner: FC<BlogThreadsBannerProps> = ({ variant }) => {
  const isListVariant = variant === 'list';
  const titleId = `blog-threads-banner-${variant}`;

  return (
    <aside
      className={clsx(
        'relative overflow-hidden border',
        isListVariant
          ? 'rounded-2xl border-indigo-400/20 bg-gradient-to-br from-indigo-500/10 via-white/[0.04] to-green-500/5 p-6 sm:p-8'
          : 'rounded-xl border-white/10 bg-white/[0.035] p-4 sm:p-5',
      )}
      aria-labelledby={titleId}
    >
      <div
        className={clsx(
          'pointer-events-none absolute rounded-full blur-3xl will-change-transform',
          isListVariant
            ? '-right-20 -top-24 size-64 bg-indigo-500/15'
            : '-right-12 -top-16 size-40 bg-indigo-500/10',
        )}
        aria-hidden="true"
        style={{ WebkitTransform: 'translateZ(0)' }}
      />

      <div
        className={clsx(
          'relative z-10 flex',
          isListVariant
            ? 'flex-col gap-6 md:flex-row md:items-center md:justify-between'
            : 'flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',
        )}
      >
        <div className={clsx('flex', isListVariant ? 'gap-4 sm:gap-5' : 'gap-3')}>
          <div
            className={clsx(
              'flex shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white',
              isListVariant ? 'size-11 sm:size-12' : 'mt-0.5 size-9',
            )}
            aria-hidden="true"
          >
            <ThreadsLogoIcon size={isListVariant ? 24 : 18} weight="bold" />
          </div>

          <div>
            <h2
              id={titleId}
              className={clsx(
                'font-bold text-white',
                isListVariant ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg',
              )}
            >
              {isListVariant
                ? 'Blog zostaje jako archiwum.'
                : 'Hej, ten blog zostaje jako archiwum.'}
            </h2>
            <p
              className={clsx(
                'text-gray-300',
                isListVariant
                  ? 'mt-3 max-w-3xl leading-relaxed'
                  : 'mt-1.5 max-w-xl text-sm leading-relaxed',
              )}
            >
              {isListVariant
                ? (
                    <>
                      Nowe, krótsze przemyślenia o&nbsp;IT, zarządzaniu, karierze i&nbsp;ludzkiej stronie technologii publikuję teraz głównie na Threads.
                    </>
                  )
                : (
                    <>
                      Nowe krótkie treści i&nbsp;bieżące przemyślenia publikuję teraz na Threads.
                    </>
                  )}
            </p>
          </div>
        </div>

        <ButtonLink
          href="https://www.threads.com/@codestorybro"
          glowClassName="bg-zinc-300"
          className={clsx('shrink-0', isListVariant ? 'w-full md:w-auto' : 'w-fit')}
          size="compact"
          variant="outline"
        >
          {isListVariant ? 'Obserwuj CodeStoryBro na Threads' : 'Wpadnij na Threads'}
        </ButtonLink>
      </div>
    </aside>
  );
};
