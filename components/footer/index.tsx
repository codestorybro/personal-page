'use client'
import SubscribeForm from '@/components/subscribe-form'
import { useTranslations } from 'next-intl'
import { FC } from 'react'

const Footer: FC = () => {
    const t = useTranslations('general')

    return (
        <div className="flex flex-col items-center mt-16">
            <SubscribeForm />
            <span className="my-8">
                ©{new Date().getFullYear()} {t('copy')}{' '}
                <span className="font-logoText text-2xl leading-3">
                    <span className="text-4xl leading-3">c</span>
                    ode$toryBro
                </span>
            </span>
        </div>
    )
}

export default Footer
