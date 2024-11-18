'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '../input'
import { Button } from '../button'
import { useTranslations, useLocale } from 'next-intl'
import { useState } from 'react'
import toast from 'react-hot-toast'
import React from 'react'

const isValidEmail = (email: string) => {
    const pattern = /\S+@\S+\.\S+/
    return pattern.test(email)
}

export const SubscribeForm: React.FC = () => {
    const locale = useLocale()
    const f = useTranslations('general')
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, reset } = useForm<{ email: string }>()

    const onSubmit: SubmitHandler<{ email: string }> = ({
        email,
    }: {
        email: string
    }) => {
        if (!email) {
            return toast.error('Email is empty')
        }

        if (!isValidEmail(email)) {
            return toast.error('Email is not valid')
        }

        setIsLoading(true)

        const res = fetch(`/${locale}/api/subscribe`, {
            method: 'POST',
            body: JSON.stringify({ email }),
        })

        toast.promise(
            res,
            {
                loading: 'Loading ...',
                success: (data) => {
                    if (!data.ok)
                        throw new Error(`${data.status} — ${data.statusText}`)
                    reset()
                    return 'Check your email to confirm your subscription'
                },
                error: (err) => err.message,
            },
            { success: { duration: 4000 }, error: { duration: 4000 } }
        )

        res.finally(() => setIsLoading(false))
    }

    return (
        <form className="subscribe-form" onSubmit={handleSubmit(onSubmit)}>
            <Input
                {...register('email')}
                placeholder={f('email')}
                label={f('newsletter')}
                className="mt-60"
                type="text"
                autoComplete="off"
                name="email"
                id="email"
            />
            <Button
                type="submit"
                className="subscribe-button"
                disabled={isLoading}
                style={{
                    fontSize: '16px',
                    padding: '8px 16px',
                }}
            >
                {f('subscribe')}
            </Button>
        </form>
    )
}
