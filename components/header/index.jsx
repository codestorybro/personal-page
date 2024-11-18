'use client'
import { Button } from '../button'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useWindowSize } from '@uidotdev/usehooks'

export default function Header({ locale }) {
    const pathname = usePathname()
    const { width } = useWindowSize()

    return (
        <div className="bostami-header-area mb-40 z-index-5">
            <div className="container">
                <div className="bostami-header-wrap main-style-2">
                    <div className="row">
                        <div className="col-lg-2 col-md-6 col-sm-4 col-4 d-flex align-items-center">
                            <Link
                                className={`site-logo ${pathname === '/pl' || pathname === '/en' ? 'site-home-logo' : ''}`}
                                href="/"
                            >
                                {width < 992 ? (
                                    <Image
                                        width={279}
                                        height={75}
                                        src="/assets/img/mobile-main-logo.webp"
                                        alt="profile"
                                        priority
                                    />
                                ) : (
                                    <>
                                        <span>
                                            <Image
                                                width={50}
                                                height={62}
                                                src="/assets/img/logo-main.svg"
                                                alt="profile"
                                                priority
                                            />
                                        </span>
                                        <span>
                                            <span
                                                style={{
                                                    fontSize: 70,
                                                    marginLeft: 8,
                                                }}
                                            >
                                                c
                                            </span>
                                            ode$toryBro
                                        </span>
                                    </>
                                )}
                            </Link>
                        </div>

                        <div className="col-lg-10 col-md-6 col-sm-8 col-8">
                            <div className="header-right-flex">
                                <div className="bostami-main-menu-wrap ">
                                    <nav className="bastami-main-menu navBar">
                                        <Link
                                            href={`/${locale}/`}
                                            aria-label="go to home page"
                                        >
                                            <Button
                                                className="nav-btn"
                                                aria-label="go to home page"
                                                isActive={
                                                    pathname === `/${locale}`
                                                }
                                            >
                                                <Image
                                                    height={30}
                                                    width={30}
                                                    alt="discord"
                                                    src="/assets/img/home.svg"
                                                />
                                            </Button>
                                        </Link>
                                        <Link
                                            href={`/${locale}/discord`}
                                            aria-label="go to discord page"
                                        >
                                            <Button
                                                className="nav-btn ml-20"
                                                aria-label="go to discord page"
                                                isActive={
                                                    pathname ===
                                                    `/${locale}/discord`
                                                }
                                            >
                                                <Image
                                                    height={30}
                                                    width={30}
                                                    alt="discord"
                                                    src="/assets/img/discord.svg"
                                                />
                                            </Button>
                                        </Link>
                                        <Link
                                            href={pathname.replace(
                                                '/en',
                                                '/pl'
                                            )}
                                            className="ml-20"
                                        >
                                            <Button
                                                className="nav-btn"
                                                isActive={locale === 'pl'}
                                            >
                                                <Image
                                                    height={30}
                                                    width={30}
                                                    alt="language"
                                                    src="/assets/img/pl.svg"
                                                />
                                            </Button>
                                        </Link>
                                        <Link
                                            href={pathname.replace(
                                                '/pl',
                                                '/en'
                                            )}
                                            className="ml-20"
                                        >
                                            <Button
                                                className="nav-btn"
                                                isActive={locale === 'en'}
                                            >
                                                <Image
                                                    height={30}
                                                    width={30}
                                                    alt="language"
                                                    src="/assets/img/en.svg"
                                                />
                                            </Button>
                                        </Link>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
