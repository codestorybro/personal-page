import clsx from 'clsx'
import { ButtonHTMLAttributes, FC } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    style?: React.CSSProperties
    className: string
    isActive?: boolean
}

export const Button: FC<Props> = ({
    children,
    className,
    isActive,
    ...props
}) => {
    return (
        <button
            className={clsx(
                className,
                `py-3 px-5 mb-4 ml-6 border border-button rounded-button shadow-page text-white font-bold transition-all duration-300 ease-in-out`,
                'hover:shadow-none',
                'active:bg-darkerBackground active:shadow-none',
                isActive && 'bg-darkerBackground shadow-none'
            )}
            type="button"
            {...props}
        >
            {children}
        </button>
    )
}
