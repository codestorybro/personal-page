import Header from '@/components/header'
import Resume from '@/components/resume/Resume'
import React from 'react'

export const metadata = {
    title: 'Mentoring by CodeStoryBro',
    description:
        'Zdobądź prawdziwą biegłość w tworzeniu oprogramowania z CodeStoryBro.',
}

export default function page() {
    return (
        <>
            <div className="page-wrapper page-wrapper-2">
                <Header />
                <Resume />
            </div>
        </>
    )
}
