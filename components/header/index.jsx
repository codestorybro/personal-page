'use client'
import { Button } from '../button'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Header({ locale }) {
    const pathname = usePathname()

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
                                        style={{ fontSize: 70, marginLeft: 8 }}
                                    >
                                        c
                                    </span>
                                    ode$toryBro
                                </span>
                            </Link>
                        </div>

                        <div className="col-lg-10 col-md-6 col-sm-8 col-8">
                            <div className="header-right-flex">
                                <div className="bostami-main-menu-wrap ">
                                    <nav className="bastami-main-menu navBar">
                                        <Link href={`/${locale}/discord`}>
                                            <Button className="nav-btn">
                                                <i className="fa-brands fa-discord"></i>
                                            </Button>
                                        </Link>
                                        <Link
                                            href={
                                                locale === 'pl'
                                                    ? pathname.replace(
                                                          '/pl',
                                                          '/en'
                                                      )
                                                    : pathname.replace(
                                                          '/en',
                                                          '/pl'
                                                      )
                                            }
                                            className="ml-20"
                                        >
                                            <Button className="nav-btn">
                                                {locale === 'pl' ? 'PL' : 'EN'}
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
