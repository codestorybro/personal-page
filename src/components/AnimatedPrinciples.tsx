import type { FC } from 'react';
import { getTranslations } from 'next-intl/server';
import { PrinciplesClient } from './PrinciplesClient';

type Props = {
  locale: string;
};

export const AnimatedPrinciples: FC<Props> = async ({ locale }) => {
  const t = await getTranslations({
    locale,
    namespace: 'Principles',
  });

  const principles = [
    {
      name: t('code_for_people'),
      description: t('code_for_people_desc'),
      iconName: 'UserGroupIcon' as const,
    },
    {
      name: t('new_technologies'),
      description: t('new_technologies_desc'),
      iconName: 'GlobeEuropeAfricaIcon' as const,
    },
    {
      name: t('code_today'),
      description: t('code_today_desc'),
      iconName: 'QuestionMarkCircleIcon' as const,
    },
    {
      name: t('no_path'),
      description: t('no_path_desc'),
      iconName: 'ArrowPathIcon' as const,
    },
  ];

  return <PrinciplesClient principles={principles} title={t('title')} />;
};
