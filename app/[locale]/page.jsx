import Header from '@/components/header'
import PersonalInfo from '@/components/personal-info'
import React from 'react'

export const metadata = {
    title: 'CodeStoryBro',
    description:
        'Sprawdź, w jaki sposób projekt CodeStoryBro może pomóc Ci rozwinąć karierę w IT.',
}

export default function Home() {
    return (
        <>
            <div className="page-wrapper page-wrapper-2">
                <Header />
                <div className="bostami-page-area z-index-3">
                    <div className="container">
                        <PersonalInfo />
                    </div>
                </div>
            </div>
        </>
    )
}
