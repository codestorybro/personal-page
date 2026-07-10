import type { FC, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

type Props = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: FC<Props> = ({ className, label, ...props }) => {
  return (
    <label className="flex w-full flex-col gap-2 text-white">
      {label && <span className="text-sm text-zinc-400">{label}</span>}
      <input
        className={clsx(
          'block w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-base text-white',
          'placeholder:text-zinc-600',
          'transition-colors duration-200',
          'focus:border-cyan-300/60 focus:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#090b0d]',
          'hover:border-white/20',
          className,
        )}
        {...props}
      />
    </label>
  );
};

export default Input;
