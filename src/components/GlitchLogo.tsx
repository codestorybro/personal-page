import type { FC } from 'react';
import clsx from 'clsx';

type GlitchLogoProps = {
  className?: string;
};

export const GlitchLogo: FC<GlitchLogoProps> = ({ className }) => {
  return (
    <span
      className={clsx('glitch-logo font-logoText', className)}
      data-text="CodeStoryBro"
      aria-hidden="true"
    >
      CodeStoryBro
    </span>
  );
};
