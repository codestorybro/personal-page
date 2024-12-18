'use client'
import React from 'react'
import { Button } from '../button'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation'
import { useWindowSize } from '@uidotdev/usehooks'
import PropTypes from 'prop-types'
import { pages } from '../../utils/pages'
import { languages } from '../../utils/languages'
import { NavButton } from '../nav-button'

export default function Header({ locale }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { width } = useWindowSize()
    const certId = searchParams.get('certId')

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
                        href={`${pathname.replace(pathname.slice(0, 3), href)}${certId ? `?certId=${certId}` : ''}`}
                        ariaLabel={ariaLabel}
                        imgSrc={imgSrc}
                        imgAlt={imgAlt}
                    />
                ))}
            </nav>
        </div>
    )
}

Header.propTypes = {
    locale: PropTypes.string.isRequired,
}
