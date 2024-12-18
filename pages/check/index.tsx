'use client'
import React, { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import toast from 'react-hot-toast'
import { CertificateForm } from '../../components/certificate-form'
import Checkmark from '../../components/checkmark'

export default function Check({ id }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const t = useTranslations('general')
    const locale = useLocale()

    useEffect(() => {
        if (!id) return
        setIsLoading(true)

        const res = fetch(`/${locale}/api/cert-check?certId=${id}`)
        res.then((res) => res.json())
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
            {
                success: { style: { display: 'none' } },
                error: { duration: 4000 },
            }
        )

        res.finally(() => setIsLoading(false))
    }, [id])

    return (
        <>
            <CertificateForm certId={id} />
            {id && !isLoading && user && (
                <div className="flex flex-col items-center justify-center">
                    <div className="my-4 text-lg font-bold text-success transition-opacity duration-500 opacity-0 animate-fadeIn">
                        {user.name} - {user.type}
                        <Checkmark />
                    </div>
                </div>
            )}
        </>
    )
}
