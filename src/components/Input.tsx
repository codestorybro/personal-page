import type { FC, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

type Props = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: FC<Props> = ({ className, label, ...props }) => {
  return (
    <label className={clsx('flex w-full flex-col text-white')}>
      <span>{label}</span>
      <input className={clsx('block w-full rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500', className)} {...props} />
    </label>
  );
};

export default Input;
