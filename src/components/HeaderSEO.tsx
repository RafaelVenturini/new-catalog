import Head from "next/head";

export function HeaderSEO() {
    const description = 'Sua loja de roupas fitness femininas no atacado. Unindo estilo e performance para você vender roupas de destaque. Conforto e qualidade em cada peça.'
    const urlBase = 'localhost:1000'

    const urlOG = `${urlBase}/imgs/open-graph.jpg`
    const title = 'Catálogo Online Liss Fitness'
    const imageUrl = ''
    const siteName = "Catálogo Online Liss Fitness"

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description}/>

            <link rel="apple-touch-icon" sizes="57x57"   href="/imgs/apple/apple-icon-57x57.png"/>
            <link rel="apple-touch-icon" sizes="60x60"   href="/imgs/apple/apple-icon-60x60.png"/>
            <link rel="apple-touch-icon" sizes="72x72"   href="/imgs/apple/apple-icon-72x72.png"/>
            <link rel="apple-touch-icon" sizes="76x76"   href="/imgs/apple/apple-icon-76x76.png"/>
            <link rel="apple-touch-icon" sizes="114x114" href="/imgs/apple/apple-icon-114x114.png"/>
            <link rel="apple-touch-icon" sizes="120x120" href="/imgs/apple/apple-icon-120x120.png"/>
            <link rel="apple-touch-icon" sizes="144x144" href="/imgs/apple/apple-icon-144x144.png"/>
            <link rel="apple-touch-icon" sizes="152x152" href="/imgs/apple/apple-icon-152x152.png"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/imgs/apple/apple-icon-180x180.png"/>

            <link rel="icon" type="image/png" sizes="192x192" href="/imgs/android/android-icon-192x192.png"/>
            <link rel="icon" type="image/png" sizes="32x32"   href="/imgs/icon/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="96x96"   href="/imgs/icon/favicon-96x96.png"/>
            <link rel="icon" type="image/png" sizes="16x16"   href="/imgs/icon/favicon-16x16.png"/>
            <meta name="msapplication-TileColor" content="#ffffff"/>
            <meta name="msapplication-TileImage" content="/imgs/"/>
            <meta name="theme-color" content="#ffffff"/>
            <link rel="manifest" href="/manifest.json"/>

            <meta property="og:site_name" content={siteName}/>
            <meta property="og:type" content="website"/>
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:url" content={urlOG}/>
            <meta property="og:image" content={imageUrl}/>
        </Head>
    )
}