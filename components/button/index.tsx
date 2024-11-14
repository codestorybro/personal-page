import React, { FC } from "react"
import styles from './Button.module.scss';

type Props = {
    children: React.ReactNode
    style: React.CSSProperties
}

export const Button: FC<Props> = ({ children, ...props }) => {
    return <button type="button" className={styles.customButton} {...props}>{children}</button>
}