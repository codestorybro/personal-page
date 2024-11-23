import Certificate from '../../../components/certificate'
import React from 'react'
import PropTypes from 'prop-types'

export default async function DiscordPage({ searchParams }) {
    const { certId } = await searchParams

    return <Certificate id={certId} />
}

DiscordPage.propTypes = {
    searchParams: PropTypes.object.isRequired,
}
