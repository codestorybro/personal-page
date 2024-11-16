import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Button } from '../button'
import Link from 'next/link'

export default function Discord() {
    const d = useTranslations('discord')
    const f = useTranslations('general')

    return (
        <>
            <h4 className="bostami-parsonal-info-title mb-30">
                <i className="fa-brands fa-discord"></i> Discord
            </h4>

            <div className="what-i-do-2">
                <div className="row">
                    <div className="col-xl-4 col-lg-6 col-md-6">
                        <div className={`bostami-what-do-item`}>
                            <div className="icon" style={{ margin: '0 auto' }}>
                                <Image
                                    height={75}
                                    width={75}
                                    alt="feature"
                                    className="feature-logo"
                                    src="/assets/img/support.svg"
                                    priority
                                />
                            </div>
                            <div>
                                <h6 className="title">{d('s01')}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6">
                        <div className={`bostami-what-do-item`}>
                            <div className="icon" style={{ margin: '0 auto' }}>
                                <Image
                                    height={75}
                                    width={75}
                                    alt="feature"
                                    className="feature-logo"
                                    src="/assets/img/light-bulb.svg"
                                    priority
                                />
                            </div>
                            <div>
                                <h6 className="title">{d('s02')}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6">
                        <div className={`bostami-what-do-item`}>
                            <div className="icon" style={{ margin: '0 auto' }}>
                                <Image
                                    height={75}
                                    width={75}
                                    alt="feature"
                                    className="feature-logo"
                                    src="/assets/img/deal.svg"
                                />
                            </div>
                            <div>
                                <h6 className="title">{d('s03')}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about-me-2-wrap">
                <div className="row">
                    <div className="col-lg-8 col-md-12">
                        <div className="bostami-parsonal-info-wrap">
                            <h4 className="bostami-parsonal-info-title mb-15">
                                {d('t1')}
                            </h4>
                            <p className="bostami-parsonal-info-bio-text">
                                {d('p1')}
                            </p>
                            <h4 className="bostami-parsonal-info-title mb-15">
                                {d('t2')}
                            </h4>
                            <p className="bostami-parsonal-info-bio-text">
                                {d('p2')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Link href="https://discord.gg/7VNpaBGCNr" target="_blank">
                <Button
                    style={{ borderRadius: 56, padding: 20, cursor: 'pointer' }}
                >
                    <h6 className="title" style={{ marginBottom: 0 }}>
                        {d('joinCommunity')}
                    </h6>
                </Button>
            </Link>

            <div className="footer-copyright text-center pt-25 pb-25 mt-50">
                <span style={{ fontSize: 16 }}>
                    ©{new Date().getFullYear()} {f('copy')}{' '}
                    <span style={{ fontFamily: 'Adrip', fontSize: 32 }}>
                        <span style={{ fontSize: 48 }}>c</span>ode$toryBro
                    </span>
                </span>
            </div>
        </>
    )
}
