import { Button } from '@/components/button'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const NavButton = ({ href, ariaLabel, imgSrc, imgAlt }) => {
    const pathname = usePathname()

    const isActive =
        pathname === href ||
        (href === '/' && (pathname === '/pl' || pathname === '/en'))

    return (
        <Link href={href} aria-label={ariaLabel}>
            <Button
                className="aspect-square"
                aria-label={ariaLabel}
                isActive={isActive}
            >
                <Image height={30} width={30} alt={imgAlt} src={imgSrc} />
            </Button>
        </Link>
    )
}
