import Check from '../../../pages/check'
import React from 'react'
import PropTypes from 'prop-types'

export default async function CheckPage({ searchParams }) {
    const { certId } = await searchParams

    return <Check id={certId} />
}

CheckPage.propTypes = {
    searchParams: PropTypes.object.isRequired,
}
