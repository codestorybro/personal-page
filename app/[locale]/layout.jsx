import { ToastContainer } from 'react-toastify'
import '../../public/main.scss'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

export default async function RootLayout({ children, params: { locale } }) {
    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale)) {
        notFound()
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages()

    return (
        <html lang={locale} style={{ background: '#1f2028' }}>
            <head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Slab:wght@300;400;500;600;700;800;900&display=swap"
                />
            </head>
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
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
