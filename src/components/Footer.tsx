'use client';
import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from './LocaleSwitcher';

const Footer: FC = () => {
  const t = useTranslations('General');

  return (
    <footer className="mx-4 mt-4 border-t-2 border-t-zinc-800 pb-4">
      <div className="mx-auto flex w-full max-w-screen-xl place-content-center items-center p-4">
        <span className="mx-4 text-sm text-gray-500 sm:text-center dark:text-gray-400">
          ©
          {new Date().getFullYear()}
          {' '}
          {t('copy')}
          {' '}
          <span className="font-logoText text-2xl leading-3">
            <span className="text-4xl leading-3">c</span>
            ode$toryBro
          </span>
        </span>
        <LocaleSwitcher />
        {/* <SubscribeForm /> */}
      </div>
    </footer>
  );
};

export default Footer;
