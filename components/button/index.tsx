import React, { FC } from 'react'
import styles from './Button.module.scss'
import { ButtonHTMLAttributes } from 'react'

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
            type="button"
            className={`${styles.customButton} ${isActive && styles['customButton-active']} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}
