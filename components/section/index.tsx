import clsx from 'clsx'
import { FC } from 'react'

interface Props {
    title?: string
    wrap?: boolean
    children: React.ReactNode
}

const Section: FC<Props> = ({ title, wrap, children }) => {
    return (
        <div
            className={clsx(
                'flex flex-col items-center text-center mt-16 mx-auto',
                wrap && 'max-w-screen-sm'
            )}
        >
            <h4 className="text-white text-3xl mb-4">{title}</h4>
            {children}
        </div>
    )
}

export default Section
