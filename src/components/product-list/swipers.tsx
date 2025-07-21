'use client'

import {Swiper, SwiperSlide} from 'swiper/react'
import {EffectCards, Virtual, Zoom} from 'swiper/modules'
import {Swiper as SwiperClass} from 'swiper';
import 'swiper/css'
import 'swiper/css/effect-cards'
import 'swiper/css/zoom'
import Image from "next/image";
import {variations} from "@components/interfaces";
import {useEffect, useRef, useState} from "react";
import {Box, CircularProgress} from "@mui/material";
import {DiscountBadge, NewerBadge} from "@components/ui/badges";
import {colors} from '@components/util'

export function InnerImage({imgLink}: {imgLink: string}) {
    const [isLoading, setIsLoading] = useState(true)
    return(
        <Box position="relative">
            {isLoading && (
                <Box
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    height="100%"
                    zIndex={1}
                >
                    <CircularProgress size={40} sx={{color:colors.brandPrimary}}/>
                </Box>
            )}
            <Image
                src={imgLink}
                alt=""
                onLoad={() => setIsLoading(false)}
                width= '1600'
                height= '1600'
                style={{
                    opacity: isLoading ? 0 : 1,
                    overflow:'hidden',
                    borderRadius: '12px',
                    objectFit: 'cover',
                    aspectRatio: 3/4
                }}
            />
        </Box>

    )
}

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
                    <div
                        className="swiper-zoom-container"
                    >
                        <InnerImage imgLink={imgLink}/>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

interface Promo {
    normalValue: number,
    promoValue: number,
}

interface Props {
    data: variations[],
    colorIdx: number,
    setActualIndexAction: (value: number) => void
    promo?: Promo | null
}

export function SwiperOuter({data, colorIdx, setActualIndexAction, promo}: Props) {
    const links = data.map(item => JSON.parse(item.img))
    const swiperRef = useRef<SwiperClass | null>(null);


    const slideGoTo = (index:number) => {
        swiperRef.current?.slideTo(index);
    }
    const handleSlideChange = () => {
        setActualIndexAction(swiperRef.current ? swiperRef.current.activeIndex : 0)
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
                            <Box className="container-badges"
                                 sx={{
                                     position: 'absolute',
                                     top: '16px',
                                     left: '16px',
                                     zIndex: 5,
                                     display: 'flex',
                                     flexDirection: 'column',
                                     alignItems: 'flex-start',
                                     gap: '12px'
                                 }}
                            >
                                {data[index].novidade ? <NewerBadge/> : null}
                                {promo && promo.promoValue > 10 ? <DiscountBadge normalValue={promo.normalValue}
                                                        promoValue={promo.promoValue}/> : null}

                            </Box>
                            <SwiperInner slides={img} />
                        </SwiperSlide>
                    );
                })
            }

        </Swiper>
    )
}