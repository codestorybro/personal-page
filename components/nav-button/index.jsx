import Link from 'next/link'
import { Button } from '../button'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

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
