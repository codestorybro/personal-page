import type { FC, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

type Props = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: FC<Props> = ({ className, label, ...props }) => {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-2 text-sm font-medium text-ink">
      {label && <span>{label}</span>}
      <input
        className={clsx(
          'min-h-12 w-full rounded border border-control bg-surface px-4 py-2 text-base font-normal text-ink placeholder:text-muted hover:border-accent',
          className,
        )}
        {...props}
      />
    </label>
  );
};

export default Input;
