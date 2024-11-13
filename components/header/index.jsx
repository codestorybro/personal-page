'use client'
import { Button } from '@/components/button'
import Link from 'next/link'

export default function Header({ locale }) {
    return (
        <div className="bostami-header-area mb-40 z-index-5">
            <div className="container">
                <div className="bostami-header-wrap main-style-2">
                    <div className="row">
                        <div className="col-lg-2 col-md-6 col-sm-4 col-4 d-flex align-items-center">
                            <Link className="site-logo" href="/">
                                <span style={{ fontSize: 70 }}>c</span>
                                ode$toryBro
                            </Link>
                        </div>

                        <div className="col-lg-10 col-md-6 col-sm-8 col-8">
                            <div className="header-right-flex">
                                <div className="bostami-main-menu-wrap ">
                                    <nav className="bastami-main-menu">
                                        <Link href={`/${locale}/discord`}>
                                            <Button>
                                                <i className="fa-brands fa-discord"></i>
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
