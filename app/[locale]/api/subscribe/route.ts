import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest | Request) {
    const body = await req.json()
    const { email } = body

    try {
        const FORM_ID = process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID
        const API_KEY = process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY

        const response = await fetch(
            `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`,
            {
                body: JSON.stringify({ email, api_key: API_KEY }),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
            }
        )
        // something went wrong on the convertkit server
        if (response.status >= 400) {
            return NextResponse.json({
                error: 'There was an error subscribing to the list.',
                status: 400,
            })
        }

        // Success
        return NextResponse.json({
            error: null,
            status: 201,
        })
    } catch (error) {
        return NextResponse.json({
            error: 'Internal server error.',
            status: 500,
        })
    }
}
