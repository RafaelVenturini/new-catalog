"use client"
import {Box} from "@mui/material";
import Image from "next/image";
import loadingGif from "@img/loading/loading.gif"
import {useEffect, useState} from "react";

export function PageLoad(){
    const [isSafari, setIsSafari] = useState(false)
    useEffect(() => {
        const ua = navigator.userAgent.toLowerCase()
        const isIOS = /iphone|ipad|ipod/.test(ua)
        const isSafariBrowser = /safari/.test(ua) && !/chrome/.test(ua)
        if(isIOS && isSafariBrowser){
            setIsSafari(true)
        }
    },[])

    const gif = <Image src={loadingGif} alt="Loading" className="spin-logo"/>

    return(
        <Box className="loader">
            {isSafari ?
                gif :
                <video autoPlay muted loop playsInline>
                    <source src="/imgs/loading/loading.webm" type="video/webm" />
                    {/* Fallback para navegadores que não suportam webm */}
                    gif
                </video>
            }
        </Box>
    )
}