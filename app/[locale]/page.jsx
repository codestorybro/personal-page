import About from '../../components/about'
import React from 'react'
import { getMessages } from 'next-intl/server'

// eslint-disable-next-line no-undef
export const revalidate = +(process.env.NEXT_REVALIDATION_TIME || 0) || 3600
export const dynamic = 'force-static'

export async function generateMetadata({ params }) {
    const { locale } = await params
    const messages = await getMessages()

    return {
        description: messages.home['og-description'],
        openGraph: {
            title: messages.home['og-title'],
            description: messages.home['og-description'],
            url: `https://codestorybro.com/${locale}`,
            locale,
        },
        twitter: {
            title: messages.home['og-title'],
            description: messages.home['og-description'],
        },
    }
}

export default function Home() {
    return <About />
}
