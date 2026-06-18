import type { FC } from 'react';
import clsx from 'clsx';

type BrandSloganProps = {
  className?: string;
  separatorClassName?: string;
};

export const BrandSlogan: FC<BrandSloganProps> = ({ className, separatorClassName }) => {
  return (
    <span className={className}>
      <span className="text-[#1ad3d9]">LEAD</span>
      {' '}
      <span className={clsx('text-gray-500', separatorClassName)}>•</span>
      {' '}
      <span className="text-[#f8f8f8]">THINK</span>
      {' '}
      <span className={clsx('text-gray-500', separatorClassName)}>•</span>
      {' '}
      <span className="text-[#d10d74]">GROW</span>
    </span>
  );
};
