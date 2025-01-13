import clsx from 'clsx'
import { FC } from 'react'

interface Props {
    children: React.ReactNode
    hasText?: boolean
}

const CardList: FC<Props> = ({ children, hasText }) => {
    return (
        <div
            className={clsx(
                'flex flex-wrap justify-center mx-auto',
                hasText ? 'items-start' : 'items-center'
            )}
        >
            {children}
        </div>
    )
}

export default CardList
