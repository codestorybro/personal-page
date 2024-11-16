import Discord from '../../../components/discord'
import React from 'react'
import { getMessages } from 'next-intl/server'

export async function generateMetadata({ params: { locale } }) {
    const messages = await getMessages()

    return {
        title: 'CodeStoryBro - Discord',
        description: messages.discord['og-description'],
        keywords: ['Discord', 'Community', 'JavaScript'],
        openGraph: {
            title: messages.discord['og-title'],
            description: messages.discord['og-description'],
            url: `https://codestorybro.com/${locale}/discord`,
            locale,
        },
        twitter: {
            title: messages.discord['og-title'],
            description: messages.home['og-description'],
        },
    }
}

export default function DiscordPage() {
    return <Discord />
}
