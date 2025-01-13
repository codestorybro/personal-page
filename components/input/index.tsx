import clsx from 'clsx'
import { FC, InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

const Input: FC<Props> = ({ className, label, ...props }) => {
    return (
        <label className={clsx('flex flex-col w-full text-white', className)}>
            <span>{label}</span>
            <input
                className="my-2 p-4 shadow-input bg-background rounded-page"
                {...props}
            />
        </label>
    )
}

export default Input
