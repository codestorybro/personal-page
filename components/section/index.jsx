import clsx from 'clsx'

export const Section = ({ title, wrap, children }) => {
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
