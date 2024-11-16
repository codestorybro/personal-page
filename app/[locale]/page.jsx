import About from '../../components/about'
import React from 'react'
import { getMessages } from 'next-intl/server'

export async function generateMetadata({ params: { locale } }) {
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
