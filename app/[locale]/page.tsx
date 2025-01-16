import Home from '@/pages/home'
import { getMessages } from 'next-intl/server'

interface Props {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
    const { locale } = await params
    const messages = (await getMessages()) as {
        home: { 'og-description': string; 'og-title': string }
    }

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

export default function HomePage() {
    return <Home />
}
