'use client';

import type { ChangeEventHandler } from 'react';
import { routing, usePathname } from '@/libs/i18nNavigation';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

export const LocaleSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    router.push(`/${event.target.value}${pathname}`);
    router.refresh();
  };

  return (
    <select aria-label="lang-switcher" onChange={handleChange} defaultValue={locale} className="m-auto block rounded-lg border border-gray-300 bg-gray-50 p-0 text-2xl text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:m-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
      {routing.locales.map(elt => (
        <option key={elt} value={elt}>
          {elt === 'en' ? '🇺🇸' : '🇵🇱'}
        </option>
      ))}
    </select>
  );
};
