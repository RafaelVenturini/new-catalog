'use client'

import {Swiper, SwiperSlide} from 'swiper/react'
import {EffectCards, Virtual, Zoom} from 'swiper/modules'
import { Swiper as SwiperClass } from 'swiper';
import 'swiper/css'
import 'swiper/css/effect-cards'
import 'swiper/css/zoom'
import Image from "next/image";
import {variations} from "@components/interfaces";
import {useEffect, useRef} from "react";

export function SwiperInner({ slides }: { slides: string[] }) {
    return (
        <Swiper
            modules={[Virtual, EffectCards, Zoom]}
            virtual={{
                enabled: true,
                addSlidesBefore: 1,
                addSlidesAfter: 1,
            }}
            direction="horizontal"
            nested={true}
            effect="cards"
            zoom={{
                toggle: true,
                minRatio: 1,
                maxRatio: 1,
            }}
            style={{ width: '100%', height: '100%' }}
        >
            {slides.map((imgLink, index) => (
                <SwiperSlide key={index} virtualIndex={index}>
                    <div className="swiper-zoom-container" style={{ padding: 40 }}>
                        <Image
                            src={imgLink}
                            alt=''
                            width= '1600'
                            height= '1600'
                            style={{
                                borderRadius:12,
                                overflow:'hidden',
                                objectFit: 'cover',
                                aspectRatio: 3/4
                            }}
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

interface Props {
    data: variations[],
    colorIdx: number,
    setActualIndex: (value: number) => void
}

export function SwiperOuter({ data,colorIdx,setActualIndex} : Props) {
    const links = data.map(item => JSON.parse(item.img))
    const swiperRef = useRef<SwiperClass | null>(null);


    const slideGoTo = (index:number) => {
        swiperRef.current?.slideTo(index);
    }
    const handleSlideChange = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setActualIndex(swiperRef.current?.activeIndex)
    }

    useEffect(() => {
        slideGoTo(colorIdx)
    }, [colorIdx,swiperRef])

    return (
        <Swiper
            modules={[Virtual]}
            virtual={{
                enabled: true,
                addSlidesAfter: 1,
            }}
            direction="horizontal"
            spaceBetween={20}
            style={{ width: '100%', height: '100%'}}
            onSwiper={(swiper) => {
                swiperRef.current = swiper
            }}
            onSlideChange={handleSlideChange}
        >
            {
                links.map((img, index) => {
                    return (
                        <SwiperSlide key={index} virtualIndex={index}>
                            <SwiperInner slides={img} />
                        </SwiperSlide>
                    );
                })
            }

        </Swiper>
    )
}