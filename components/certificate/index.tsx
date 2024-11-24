'use client'
import React, { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import toast from 'react-hot-toast'
import { CertificateForm } from '../certificate-form'
import { Checkmark } from 'react-checkmark'

export default function Certificate({ id }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const t = useTranslations('general')
    const locale = useLocale()
    
    useEffect(() => {
        if (!id) return
        setIsLoading(true)

        const res = fetch(`/${locale}/api/cert-check?certId=${id}`)
        res
            .then((res) => res.json())
            .then(({ body }) => {
                setUser(body)
            })
            .catch(() => {
                setUser(null)
            })

        toast.promise(
            res,
            {
                loading: 'Loading ...',
                success: (data) => {
                    if (!data.ok) {
                        setUser(null)
                        throw new Error(`${data.status} — ${data.statusText}`)
                    }
                    setUser(data.body)
                    return t('certificate-check-success')
                },
                error: (err) => {
                    if (err.status >= 400) return t('certificate-check-error')
                    else return t('certificate-check-invalid')
                },
            },
            { success: { style: { display: 'none' } }, error: { duration: 4000 } }
        )

        res.finally(() => setIsLoading(false))
    }, [id])

    return (
        <>
            <CertificateForm certId={id} />
            {id && !isLoading && user && <div style={{ fontSize: 16, color: '#7ac142' }}>
                <div style={{margin: '16px 0'}}>{user.name} - {user.type}</div>
                <Checkmark style={{ marginBottom: 16 }} />
            </div>}
        </>
    )
}
