import React, { FC } from 'react'
import styles from './Button.module.scss'
import { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    style?: React.CSSProperties
    className: string
}

export const Button: FC<Props> = ({ children, className, ...props }) => {
    return (
        <button
            type="button"
            className={`${styles.customButton} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}
