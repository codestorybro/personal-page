'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '../input'
import { Button } from '../button'
import { useTranslations } from 'next-intl'
import toast from 'react-hot-toast'
import React from 'react'
import { usePathname, useRouter } from '../../i18n/routing'
import { useSearchParams } from 'next/navigation'

export const CertificateForm: React.FC<{ certId: string }> = ({ certId }) => {
    const { register, handleSubmit } = useForm<{ id: string }>()
    const t = useTranslations('general')
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const updateSearchQuery = (updatedQuery) => {
        const params = new URLSearchParams(searchParams)
        Object.keys(updatedQuery).forEach((key) => {
            if (updatedQuery[key]) {
                params.set(key, updatedQuery[key])
            } else {
                params.delete(key)
            }
        })
        const queryString = params.toString()
        const updatedPath = queryString
            ? `${pathname}?${queryString}`
            : pathname
        router.push(updatedPath)
    }

    const onSubmit: SubmitHandler<{ id: string }> = ({
        id,
    }: {
        id: string
    }) => {
        if (!id) {
            return toast.error(t('certificate-check-empty'))
        }

        updateSearchQuery({ certId: id })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row ">
            <Input
                {...register('id')}
                placeholder={t('certificate-id')}
                label={t('certificate-check')}
                type="text"
                autoComplete="off"
                name="id"
                id="id"
                defaultValue={certId}
            />
            <Button type="submit" className="h-min place-self-end my-2 ">
                {t('check')}
            </Button>
        </form>
    )
}
