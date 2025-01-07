import clsx from 'clsx'
import Image from 'next/image'

export const Card = ({ text, imgSrc, imgAlt, imgHeight, imgWidth }) => {
    return (
        <div
            className={clsx(
                'flex flex-col items-center text-white text-xl text-center font-bold my-6',
                text ? 'mx-2' : 'mx-12'
            )}
        >
            <Image
                height={imgHeight}
                width={imgWidth}
                alt={imgAlt}
                src={imgSrc}
            />
            {text && <h5 className="mx-4 mt-4 w-52">{text}</h5>}
        </div>
    )
}
