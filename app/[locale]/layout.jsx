import { ToastContainer } from 'react-toastify'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Header from '@/components/header'
import { GoogleAnalytics } from '@next/third-parties/google'
import '../../public/main.scss'

export const metadata = {
    title: 'CodeStoryBro',
    description:
        'CodeStoryBro is here to guide you through the challenges, help you set clear career paths, and unlock your potential in the tech world. Whether you’re just starting out or looking to advance, personalized mentoring will give you the tools, support, and real-world insights to fast-track your growth.',
    keywords: ['React', 'JavaScript', 'TypeScript'],
    authors: [{ name: 'Marcin Kołodziej' }],
    creator: 'CodeStoryBro',
    publisher: 'Marcin Kołodziej',
    openGraph: {
        title: 'CodeStoryBro - Empower Your Coding Journey',
        description:
            'CodeStoryBro is here to guide you through the challenges, help you set clear career paths, and unlock your potential in the tech world. Whether you’re just starting out or looking to advance, personalized mentoring will give you the tools, support, and real-world insights to fast-track your growth.',
        url: 'https://codestorybro.com',
        siteName: 'CodeStoryBro',
        locale: 'en',
        type: 'website',
        images: {
            url: 'https://www.codestorybro.com/assets/img/og-image.png',
            width: 1200,
            height: 630,
            alt: 'CodeStoryBro',
        },
    },
    twitter: {
        card: 'summary_large_image',
        title: 'CodeStoryBro - Empower Your Coding Journey',
        site: '@codestorybro',
        creator: '@codestorybro',
        description:
            'CodeStoryBro is here to guide you through the challenges, help you set clear career paths, and unlock your potential in the tech world. Whether you’re just starting out or looking to advance, personalized mentoring will give you the tools, support, and real-world insights to fast-track your growth.',
        images: {
            url: 'https://www.codestorybro.com/assets/img/og-image.png',
            width: 1200,
            height: 630,
            alt: 'CodeStoryBro',
        },
    },
}

export default async function RootLayout({ children, params: { locale } }) {
    if (!routing.locales.includes(locale)) {
        notFound()
    }
    const messages = await getMessages()

    return (
        <html lang={locale}>
            <head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Slab:wght@300;400;500;600;700;800;900&display=swap"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="/favicon/icon-96x96.png"
                    sizes="96x96"
                />
                <link
                    rel="icon"
                    type="image/svg+xml"
                    href="/favicon/icon.svg"
                />
                <link rel="shortcut icon" href="/favicon/icon.ico" />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/favicon/apple-touch-icon.png"
                />
                <link rel="manifest" href="/favicon/site.webmanifest" />
            </head>
            <GoogleAnalytics gaId="G-08Z48FJ7RM" />
            <body>
                <NextIntlClientProvider messages={messages}>
                    <ToastContainer
                        position="top-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    <div className="page-wrapper page-wrapper-2">
                        <Header locale={locale} />
                        <div className="bostami-page-area z-index-3">
                            <div className="container">
                                <div className="bostami-page-wrap pt-60 pl-80 pr-80">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
