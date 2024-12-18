import clsx from 'clsx'

export const CardList = ({ children, hasText }) => {
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
