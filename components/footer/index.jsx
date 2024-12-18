'use client'
import React from 'react'
import { SubscribeForm } from '../subscribe-form'

export default function Footer({ messages }) {
    return (
        <div className="flex flex-col items-center mt-16">
            <SubscribeForm />
            <span className="my-8">
                ©{new Date().getFullYear()} {messages.general['copy']}{' '}
                <span className="font-logoText text-2xl leading-3">
                    <span className="text-4xl leading-3">c</span>
                    ode$toryBro
                </span>
            </span>
        </div>
    )
}
