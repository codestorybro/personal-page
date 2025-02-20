import type { ButtonHTMLAttributes, FC } from 'react';
import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<Props> = ({ children, className, isActive, ...props }) => {
  return (
    <button
      className={clsx(
        'inline-block cursor-pointer rounded bg-indigo-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-500 ease-in-out hover:bg-indigo-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-indigo-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]',
        'active:bg-indigo-700',
        className,
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
