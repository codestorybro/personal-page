import About from '@/components/about'
import React from 'react'

export const metadata = {
    title: 'CodeStoryBro',
    description:
        'Sprawdź, w jaki sposób projekt CodeStoryBro może pomóc Ci rozwinąć karierę w IT.',
}

export default function Home() {
    return (
        <div className="bostami-page-area z-index-3">
            <div className="container">
                <About />
            </div>
        </div>
    )
}
