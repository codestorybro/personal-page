import Contact from '@/components/contact'
import Header from '@/components/header'
import React from 'react'

export const metadata = {
    title: 'Społeczność CodeStoryBro na Discord',
    description:
        'Rozwijaj się, buduj sieć kontaktów i szukaj ciekawych projektów w społeczności CodeStoryBro na Discordzie.',
}

export default function page() {
    return (
        <div className="page-wrapper page-wrapper-2">
            <Contact />
        </div>
    )
}
