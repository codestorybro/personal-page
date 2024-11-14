'use client'
import { items } from '@/data/jobFeatures'
import React, { useEffect, useState } from 'react'
import { clientLogos } from '@/data/clientLogos'
import { Navigation, Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { bioData } from '@/data/bioData'
import Image from 'next/image'

export default function About() {
    const [showSlider, setShowSlider] = useState(false)

    useEffect(() => {
        setShowSlider(true)
    }, [])

    return (
        <>
            <div className="about-me-2-wrap">
                <div className="row">
                    <div className="col-lg-8 col-md-12">
                        <div className="bostami-parsonal-info-wrap mb-40">
                            <h4 className="bostami-parsonal-info-title">
                                Feeling tired learning JavaScript?
                            </h4>
                            <p className="bostami-parsonal-info-bio-text">
                                {bioData.descOne}
                            </p>

                            <p className="bostami-parsonal-info-bio-text">
                                {bioData.descTwo}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="what-i-do-2 mb-50">
                <div className="row">
                    <div className="col-12">
                        <div className="bostami-section-title-wrap mb-30">
                            <h3 className="section-title">
                                What can you learn?
                            </h3>
                        </div>
                    </div>

                    {items.map((elm, i) => (
                        <div key={i} className="col-xl-4 col-lg-6 col-md-6">
                            <div className={`bostami-what-do-item ${elm.bg}`}>
                                <div
                                    className="icon"
                                    style={{ margin: '0 auto' }}
                                >
                                    <Image
                                        height={45}
                                        width={180}
                                        style={{
                                            margin: '0 auto',
                                            height: 'auto',
                                        }}
                                        alt="feature"
                                        src={elm.icon}
                                    />
                                </div>
                                <div className="text">
                                    <h4 className="title">{elm.title}</h4>
                                    <p>{elm.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="col-12">
                <div className="bostami-section-title-wrap mb-30">
                    <h3 className="section-title">
                        Who has already benefited?
                    </h3>
                </div>
            </div>
            <div className="client-2-wrap bg-light-white-2 pt-65 pb-65">
                <div className="row">
                    <div className="col-12">
                        <div className="bostami-client-slider">
                            <div className="swiper-container client_slide_active">
                                {showSlider && (
                                    <Swiper
                                        modules={[
                                            Navigation,
                                            Pagination,
                                            Autoplay,
                                        ]}
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
            </div>

            <div className="footer-copyright text-center pt-25 pb-25 mt-50">
                <span style={{ fontSize: 16 }}>
                    ©{new Date().getFullYear()} All rights reserved by{' '}
                    <span style={{ fontFamily: 'Adrip', fontSize: 32 }}>
                        <span style={{ fontSize: 48 }}>c</span>ode$toryBro
                    </span>
                </span>
            </div>
        </>
    )
}
