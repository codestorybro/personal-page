import React, { FC } from 'react'
import styles from './Input.module.scss'
import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

export const Input: FC<Props> = ({ className, label, ...props }) => {
    return (
        <label className={`${styles.customLabel} ${className}`}>
            <div style={{ fontSize: '15px' }}>{label}</div>
            <input className={styles.customInput} {...props} />
        </label>
    )
}
