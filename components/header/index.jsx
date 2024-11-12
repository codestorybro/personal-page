'use client'
import { menuItems } from '@/data/menu'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Menu from '../menu'
import { usePathname } from 'next/navigation'

export default function Header() {
    const pathname = usePathname()
    const [menuOpen, setMenuOpen] = useState(false)
    const [darkMode, setDarkMode] = useState(true)
    const addDarkbg = () => {
        if (document.body.style.backgroundColor != 'var(--background-dark)') {
            document.body.style.backgroundColor = 'var(--background-dark)'
            setDarkMode(true)
        }
    }
    const addlightBg = () => {
        if (document.body.style.backgroundColor != 'var(--background-white)') {
            document.body.style.backgroundColor = 'var(--background-white)'
            setDarkMode(false)
        }
    }

    const toggleTheme = () => {
        const theme = localStorage?.getItem('theme')
        if (theme == 'dark') {
            localStorage.setItem('theme', 'light')
            document.body.classList.remove('dark-theme')
            addlightBg()
        } else {
            localStorage?.setItem('theme', 'dark')
            document.body.classList.add('dark-theme')
            addDarkbg()
        }
    }

    useEffect(() => {
        const theme = localStorage?.getItem('theme')
        if (theme == 'dark') {
            document.body.classList.add('dark-theme')
            addDarkbg()
            setDarkMode(true)
        } else {
            document.body.classList.remove('dark-theme')
            addlightBg()
            setDarkMode(false)
        }
    }, [])

    return (
        <div className="bostami-header-area mb-80 z-index-5">
            <div className="container">
                <div className="bostami-header-wrap main-style-2">
                    <div className="row">
                        <div className="col-lg-2 col-md-6 col-sm-4 col-4 d-flex align-items-center">
                            <div className="bostami-header-logo">
                                <Link className="site-logo" href="/">
                                    <span>code$toryBro</span>
                                    {/* <Image
                    width={153}
                    height={32}
                    src="/assets/img/logo/logo-2.png"
                    alt="logo"
                  /> */}
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-10 col-md-6 col-sm-8 col-8">
                            <div className="header-right-flex">
                                <div className="bostami-main-menu-wrap ">
                                    <nav className="bastami-main-menu main_menu_2">
                                        <ul
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {menuItems.map((elm, i) => (
                                                <li
                                                    key={i}
                                                    className={
                                                        pathname == elm.href
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    <Link
                                                        href={elm.href}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    '21px',
                                                            }}
                                                        >
                                                            <i
                                                                className={
                                                                    elm.icon
                                                                }
                                                            ></i>
                                                        </span>
                                                        <span>
                                                            {' '}
                                                            {elm.text.toLowerCase()}
                                                        </span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </div>
                                <div className="bostami-header-menu-btn text-right ml-30">
                                    <div
                                        className="dark-btn dark-btn-2 mode-btn"
                                        onClick={toggleTheme}
                                    >
                                        {darkMode ? (
                                            <i className="sunicon fa-light fa-sun-bright"></i>
                                        ) : (
                                            <i className="moonicon fa-solid fa-moon"></i>
                                        )}
                                    </div>
                                    <div className="menu-btn-wrap d-lg-none">
                                        <div
                                            className={`menu-btn menu-btn-2 toggle_menu$ {menuOpen && "active"} `}
                                            onClick={() =>
                                                setMenuOpen((pre) => !pre)
                                            }
                                        >
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mobile-menu-wrap">
                    <div
                        className={`mobile-menu mobile_menu_2 ${menuOpen && 'active'} `}
                    >
                        <Menu setMenuOpen={setMenuOpen} data={menuItems} />
                    </div>
                </div>
            </div>
        </div>
    )
}
