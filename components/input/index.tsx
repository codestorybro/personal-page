import React, { FC } from 'react'
import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

export const Input: FC<Props> = ({ className, label, ...props }) => {
    return (
        <label className="flex flex-col w-full text-white">
            <span>{label}</span>
            <input
                className="my-2 p-4 shadow-input bg-background rounded-page"
                {...props}
            />
        </label>
    )
}
