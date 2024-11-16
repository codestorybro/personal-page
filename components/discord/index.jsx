import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function Discord() {
    const p = useTranslations('page')

    return (
        <>
            <h4 className="bostami-parsonal-info-title mb-15">
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
                                    src="/assets/img/sweat.svg"
                                />
                            </div>
                            <div>
                                <h6 className="title">
                                    Make connections and friends
                                </h6>
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
                                    src="/assets/img/fire.svg"
                                />
                            </div>
                            <div>
                                <h6 className="title">
                                    Share ideas and projects
                                </h6>
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
                                    src="/assets/img/path.svg"
                                />
                            </div>
                            <div>
                                <h6 className="title">
                                    Learn and grow together
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-copyright text-center pt-25 pb-25 mt-50">
                <span style={{ fontSize: 16 }}>
                    ©{new Date().getFullYear()} {p('copy')}{' '}
                    <span style={{ fontFamily: 'Adrip', fontSize: 32 }}>
                        <span style={{ fontSize: 48 }}>c</span>ode$toryBro
                    </span>
                </span>
            </div>
        </>
    )
}
