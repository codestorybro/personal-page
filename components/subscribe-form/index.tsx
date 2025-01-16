'use client'
import Button from '@/components/button'
import Input from '@/components/input'
import { useLocale, useTranslations } from 'next-intl'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const isValidEmail = (email: string) => {
    const pattern = /\S+@\S+\.\S+/
    return pattern.test(email)
}

const SubscribeForm: FC = () => {
    const locale = useLocale()
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, reset } = useForm<{ email: string }>()
    const t = useTranslations('general')

    const onSubmit: SubmitHandler<{ email: string }> = ({
        email,
    }: {
        email: string
    }) => {
        if (!email) {
            return toast.error(t('subscribe-email-empty'))
        }

        if (!isValidEmail(email)) {
            return toast.error(t('subscribe-email-invalid'))
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
                    return t('subscribe-success')
                },
                error: (err) => err.message,
            },
            { success: { duration: 4000 }, error: { duration: 4000 } }
        )

        res.finally(() => setIsLoading(false))
    }

    return (
        <form
            className="flex flex-row align-bottom w-full "
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                {...register('email')}
                placeholder={t('email')}
                label={t('newsletter')}
                type="text"
                autoComplete="off"
                name="email"
                id="email"
            />
            <Button
                type="submit"
                className="place-self-end"
                disabled={isLoading}
            >
                {t('subscribe')}
            </Button>
        </form>
    )
}

export default SubscribeForm
