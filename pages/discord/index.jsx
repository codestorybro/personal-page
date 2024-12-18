import React from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '../../components/button'
import Link from 'next/link'
import { PageTitle } from '../../components/page-title'
import { CardList } from '../../components/card-list'
import { Card } from '../../components/card'
import { Section } from '../../components/section'

export default function Discord() {
    const d = useTranslations('discord')

    return (
        <>
            <PageTitle
                title="Discord"
                imgSrc="/assets/img/discord-white.svg"
                imgAlt="discord"
            />

            <CardList hasText>
                <Card
                    text={d('s01')}
                    imgSrc="/assets/img/support.svg"
                    imgAlt="support"
                    imgHeight={75}
                    imgWidth={75}
                />
                <Card
                    text={d('s02')}
                    imgSrc="/assets/img/light-bulb.svg"
                    imgAlt="light bulb"
                    imgHeight={75}
                    imgWidth={75}
                />
                <Card
                    text={d('s03')}
                    imgSrc="/assets/img/deal.svg"
                    imgAlt="deal"
                    imgHeight={75}
                    imgWidth={75}
                />
            </CardList>

            <Section title={d('t1')} wrap>
                <p>{d('p1')}</p>
            </Section>

            <Section title={d('t2')} wrap>
                <p>{d('p2')}</p>
            </Section>

            <Section>
                <Button>
                    <Link href="https://discord.gg/7VNpaBGCNr" target="_blank">
                        <h6>{d('joinCommunity')}</h6>
                    </Link>
                </Button>
            </Section>
        </>
    )
}
