'use client'
import React, { useEffect, useState } from 'react'
import { clientLogos } from '../../data/client-logos'
import { Navigation, Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { SubscribeForm } from '../subscribe-form'

export default function About() {
    const [showSlider, setShowSlider] = useState(false)
    const t = useTranslations('home')
    const f = useTranslations('general')

    useEffect(() => {
        setShowSlider(true)
    }, [])

    return (
        <>
            <h2 className="bostami-parsonal-info-title page-title mb-30">
                <Image
                    height={42}
                    width={42}
                    alt="hi"
                    src="/assets/img/five.svg"
                />{' '}
                {t('hello')}
            </h2>

            <div className="what-i-do">
                <div className="row row-left">
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
                                <h5 className="title">{t('s01')}</h5>
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
                                    src="/assets/img/graph.svg"
                                />
                            </div>
                            <div>
                                <h5 className="title">{t('s02')}</h5>
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
                                <h5 className="title">{t('s03')}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about-me-2-wrap">
                <div className="row">
                    <div className="col-lg-8 col-md-12">
                        <div className="bostami-parsonal-info-wrap mb-60">
                            <p className="bostami-parsonal-info-bio-text">
                                {t('p01')}
                            </p>
                            <h4 className="bostami-parsonal-info-title">
                                {t('t1')}
                            </h4>
                            <p className="bostami-parsonal-info-bio-text">
                                <span
                                    style={{
                                        fontFamily: 'Adrip',
                                        fontSize: 24,
                                    }}
                                >
                                    <span style={{ fontSize: 32 }}>c</span>
                                    ode$toryBro
                                </span>{' '}
                                {t('p11')}
                            </p>
                            <p className="bostami-parsonal-info-bio-text">
                                {t('p12')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12">
                <div className="bostami-section-title-wrap">
                    <h4 className="section-title">{t('t2')}</h4>
                </div>
            </div>

            <p className="bostami-parsonal-info-bio-text">{t('p21')}</p>

            <Link
                href="mailto:hello@codestorybro.com"
                aria-label="send an email"
                target="_blank"
            >
                <h6 className="mail" style={{ marginBottom: 0 }}>
                    hello@codestorybro.com
                </h6>
            </Link>

            <div className="col-12 mt-60">
                <div className="bostami-section-title-wrap mb-30">
                    <h4 className="section-title">{t('t3')}</h4>
                </div>
            </div>
            <div className="row client-row">
                <div className="col-12">
                    <div className="bostami-client-slider">
                        <div className="swiper-container client_slide_active">
                            {showSlider && (
                                <Swiper
                                    modules={[Navigation, Pagination, Autoplay]}
                                    spaceBetween={30}
                                    slidesPerView={2}
                                    loop={true}
                                    autoplay={{
                                        delay: 3000, // Time between each slide (in milliseconds)
                                        disableOnInteraction: false, // Set to false if you want the auto slider to continue even when the user interacts with the slider (e.g., clicking on a slide).
                                    }}
                                    breakpoints={{
                                        // when window width is >= 576px
                                        450: {
                                            slidesPerView: 3,
                                        },
                                        // when window width is >= 768px
                                        768: {
                                            slidesPerView: 4,
                                        },
                                        1200: {
                                            // when window width is >= 992px
                                            slidesPerView: 5,
                                        },
                                    }}
                                >
                                    {clientLogos.map((elm, i) => (
                                        <SwiperSlide key={i}>
                                            <div className="swiper-slide">
                                                <Image
                                                    height={62}
                                                    width={196}
                                                    className="bostami-client-slider-logo"
                                                    src={elm.imgSrc}
                                                    alt="client"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <SubscribeForm />

            <div className="footer-copyright text-center pt-25 pb-25">
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
