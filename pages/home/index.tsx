import Card from '@/components/card'
import CardList from '@/components/card-list'
import PageTitle from '@/components/page-title'
import Section from '@/components/section'
import { clientLogos } from '@/utils/client-logos'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

const Home = () => {
    const t = useTranslations('home')

    return (
        <>
            <PageTitle
                title={t('hello')}
                imgSrc="/assets/img/five.svg"
                imgAlt="hi"
            />
            <CardList hasText>
                <Card
                    text={t('s01')}
                    imgSrc="/assets/img/fire.svg"
                    imgAlt="fire"
                    imgHeight={75}
                    imgWidth={75}
                />
                <Card
                    text={t('s02')}
                    imgSrc="/assets/img/graph.svg"
                    imgAlt="graph"
                    imgHeight={75}
                    imgWidth={75}
                />
                <Card
                    text={t('s03')}
                    imgSrc="/assets/img/path.svg"
                    imgAlt="path"
                    imgHeight={75}
                    imgWidth={75}
                />
            </CardList>
            <Section title={t('t1')} wrap>
                <p className="mb-4">
                    <span className="font-logoText text-2xl leading-3">
                        <span className="text-4xl leading-3">c</span>
                        ode$toryBro
                    </span>{' '}
                    {t('p11')}
                </p>
                <p>{t('p12')}</p>
            </Section>
            <Section title={t('t3')}>
                <CardList>
                    {clientLogos.map((logo, index) => (
                        <Card
                            key={index}
                            imgSrc={logo.imgSrc}
                            imgAlt={logo.imgAlt}
                            imgHeight={62}
                            imgWidth={196}
                        />
                    ))}
                </CardList>
            </Section>
            <Section title={t('t2')} wrap>
                <p>
                    {t('p21')}
                    {' — '}
                    <Link
                        href="mailto:hello@codestorybro.com"
                        aria-label="send an email"
                        target="_blank"
                    >
                        <span className="relative after:bg-link after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500">
                            hello@codestorybro.com
                        </span>
                    </Link>
                </p>
            </Section>
        </>
    )
}

export default Home
