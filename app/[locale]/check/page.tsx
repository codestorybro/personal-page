import Check from '@/pages/check'

interface Props {
    searchParams: Promise<{ certId?: string }>
}

export default async function CheckPage({ searchParams }: Props) {
    const { certId } = await searchParams

    return <Check id={certId} />
}
