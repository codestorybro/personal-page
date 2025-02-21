import type { FC } from 'react';
import { ArrowPathIcon, GlobeEuropeAfricaIcon, QuestionMarkCircleIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { getTranslations } from 'next-intl/server';

type Props = {
  locale: string;
};

export const Principles: FC<Props> = async ({ locale }) => {
  const t = await getTranslations({
    locale,
    namespace: 'Principles',
  });

  const principles = [
    {
      name: t('code_for_people'),
      description: t('code_for_people_desc'),
      icon: UserGroupIcon,
    },
    {
      name: t('new_technologies'),
      description: t('new_technologies_desc'),
      icon: GlobeEuropeAfricaIcon,
    },
    {
      name: t('code_today'),
      description: t('code_today_desc'),
      icon: QuestionMarkCircleIcon,
    },
    {
      name: t('no_path'),
      description: t('no_path_desc'),
      icon: ArrowPathIcon,
    },
  ];

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mx-auto w-fit bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-base/7 font-semibold text-transparent">{t('title')}</h2>
        </div>
        <div className="mx-auto mt-6 max-w-2xl lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {principles.map(feature => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-2xl font-semibold text-white">
                  <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-3 text-lg text-gray-400">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
