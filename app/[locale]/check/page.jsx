import Certificate from '../../../components/certificate'
import React from 'react'

export default async function DiscordPage({ searchParams }) {
    const { certId } = await searchParams

    return <Certificate id={certId} />
}
