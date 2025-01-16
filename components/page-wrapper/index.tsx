import { FC, ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const PageWrapper: FC<Props> = ({ children }) => {
    return (
        <div className="p-16 my-8 shadow-page rounded-page min-h-96">
            {children}
        </div>
    )
}

export default PageWrapper
