'use client'
import NavButton from '@/components/nav-button'
import { languages } from '@/utils/languages'
import { pages } from '@/utils/pages'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { FC } from 'react'

interface Props {
    locale: string
}

const Header: FC<Props> = ({ locale }) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const certId = searchParams?.get('certId')

    return (
        <div className="flex w-full	justify-between">
            <Link href="/">
                <div className="flex flex-row items-center ml-16">
                    <Image
                        width={50}
                        height={62}
                        src="/assets/img/logo-main.svg"
                        alt="profile"
                        priority
                    />
                    <span className="font-logoText text-5xl text-white ml-4">
                        <span className="text-7xl">c</span>
                        ode$toryBro
                    </span>
                </div>
            </Link>

            <nav className="flex items-center">
                {pages.map(({ ariaLabel, href, imgSrc, imgAlt }, index) => (
                    <NavButton
                        key={index}
                        href={`/${locale}${href}`}
                        ariaLabel={ariaLabel}
                        imgSrc={imgSrc}
                        imgAlt={imgAlt}
                    />
                ))}
                {languages.map(({ ariaLabel, href, imgSrc, imgAlt }, index) => (
                    <NavButton
                        key={index}
                        href={`${pathname?.replace(pathname.slice(0, 3), href)}${certId ? `?certId=${certId}` : ''}`}
                        ariaLabel={ariaLabel}
                        imgSrc={imgSrc}
                        imgAlt={imgAlt}
                    />
                ))}
            </nav>
        </div>
    )
}

export default Header
