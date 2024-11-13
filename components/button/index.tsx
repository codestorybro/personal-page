import React, { FC } from "react"
import styles from './Button.module.scss';

type Props = {
    children: React.ReactNode
}

export const Button: FC<Props> = ({ children }) => {
    return <button type="button" className={styles.customButton}>{children}</button>
}