'use client';

import type { FC } from 'react';
import { useCopyEmail } from '@/hooks/useCopyEmail';
import { AppConfig } from '@/utils/AppConfig';
import Button from './Button';

type CopyEmailButtonProps = {
  children: React.ReactNode;
  glowClassName?: string;
};

export const CopyEmailButton: FC<CopyEmailButtonProps> = ({ children, glowClassName }) => {
  const copyEmail = useCopyEmail();

  return (
    <Button
      onClick={() => {
        void copyEmail();
      }}
      ariaLabel={`Skopiuj adres email ${AppConfig.author.email}`}
      glowClassName={glowClassName}
    >
      {children}
    </Button>
  );
};
