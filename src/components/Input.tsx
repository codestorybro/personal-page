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
          'block w-full rounded-lg border-2 border-white/10 bg-white/5 px-4 py-3 text-base text-white',
          'placeholder:text-gray-500',
          'transition-colors duration-200',
          'focus:border-indigo-500 focus:bg-white/10 focus:outline-none',
          'hover:border-white/20 hover:bg-white/[0.07]',
          className,
        )}
        {...props}
      />
    </label>
  );
};

export default Input;
