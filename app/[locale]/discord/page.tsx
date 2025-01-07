import { TLocale } from '@/i18n/routing'
import Discord from '@/pages/discord'
import { getMessages } from 'next-intl/server'

interface Props {
    params: Promise<{ locale: TLocale }>
}

export async function generateMetadata({ params }: Props) {
    const { locale } = await params
    const messages = (await getMessages()) as Record<string, unknown>

    const discordMessages =
        (messages['discord'] as Record<string, string>) || {}
    const homeMessages = (messages['home'] as Record<string, string>) || {}

    return {
        title: 'CodeStoryBro - Discord',
        description: discordMessages['og-description'],
        keywords: ['Discord', 'Community', 'JavaScript'],
        openGraph: {
            title: discordMessages['og-title'],
            description: discordMessages['og-description'],
            url: `https://codestorybro.com/${locale}/discord`,
            locale,
        },
        twitter: {
            title: discordMessages['og-title'],
            description: homeMessages['og-description'],
        },
    }
}

export default function DiscordPage() {
    return <Discord />
}
