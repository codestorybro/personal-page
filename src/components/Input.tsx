import type { FC, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

type Props = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: FC<Props> = ({ className, label, ...props }) => {
  return (
    <label className="flex w-full flex-col gap-2 text-white">
      {label && <span className="text-sm text-gray-400">{label}</span>}
      <input
        className={clsx(
          'block w-full rounded-lg border-0 bg-white/5 px-4 py-3 text-base text-white',
          'ring-1 ring-inset ring-white/10',
          'placeholder:text-gray-500',
          'transition-all duration-200',
          'focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500',
          'hover:bg-white/[0.07] hover:ring-white/20',
          className,
        )}
        {...props}
      />
    </label>
  );
};

export default Input;
