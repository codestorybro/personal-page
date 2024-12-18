import Image from 'next/image'

export const PageTitle = ({ title, imgSrc, imgAlt }) => {
    return (
        <h2 className="flex text-3xl text-white mb-16">
            <Image
                className="mr-2"
                height={42}
                width={42}
                alt={imgAlt}
                src={imgSrc}
            />{' '}
            {title}
        </h2>
    )
}
