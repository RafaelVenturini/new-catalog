"use client"
import {ArrowRight} from 'lucide-react'
import novidades from "@img/novidades.webp"
import {vendedoras} from "@components/util";
import {Category} from "@components/interfaces";
import Image, {StaticImageData} from "next/image";
import {LogoSvg, WhatsappSvg} from "@components/ui/svg";
import {Box, Container, Grid, Typography} from "@mui/material";

interface topProps {
    chosenCategoryAction: (value: Category) => void,
}

export function MenuTop({chosenCategoryAction}: topProps) {
    return(
        <Box component="section" className="intro ">
            <Container className="container flex flex-col items-center justify-center gap-4">
                <Typography
                    component="h1"
                    variant="h1"
                    fontSize="1rem"
                    lineHeight="1"
                    letterSpacing="0.2em"
                    marginBottom="24"
                >
                    CATÁLOGO
                </Typography>
                <Box sx={{marginBottom: '64px'}}>
                    <LogoSvg/>
                </Box>
                <Box
                    className="card-link-novidades"
                    position="relative"
                    onClick={() => chosenCategoryAction({id: -1, typ: '', label: ['Novidades']})}
                >
                    <Image
                        src={novidades}
                        alt="Novidades"
                        width={1600}
                        height={1600}
                        className="card-link-novidades-img"
                        loading="eager"
                    />
                    <Box className="btn btn-md btn-primary">
                        Ver Novidades{<ArrowRight/>}
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}


interface Props {
    chosenCategoryAction: (value: Category) => void,
    category: Category,
    imgLink: StaticImageData | string,
}

export function CategoryButton({chosenCategoryAction, category, imgLink}: Props) {
    return (
        <Grid size={6}
              component="li"
              onClick={() => chosenCategoryAction(category)}
        >
            <Image
                src={imgLink}
                alt=""
                width={1600}
                height={1600}
                className="category-img"
                loading="eager"
            />
            <Typography
                variant="h6"
                component="h3"
                sx={{
                    marginBottom: '8px',
                    fontSize: '1rem',
                    lineHeight: '1.2',
                    color: '#1F141A'
                }}
            >
                {category.label[0]}
                <br/>
                {category.label[1]}
            </Typography>

            <Typography variant="body1" className="link-solo">Ver Produtos{<ArrowRight/>}</Typography>
        </Grid>
    )
}

export function MenuBottom() {
    return (
        <Box component="section">
            <Container className="helper">
                <Typography variant="h2" sx={{maxWidth: '238px', margin: '0px auto 32px'}}>Precisando
                    de uma ajuda?</Typography>
                <Box
                    className="btn btn-md btn-primary"
                    onClick={() => {
                        const idx = localStorage.getItem('vend')
                        if (idx) {
                            window.open(`https://wa.me/5527${vendedoras[parseInt(idx)].num}`)
                        } else {
                            console.log('localStorage nao encontrado')
                            window.open(`https://wa.me/5527${vendedoras[1].num}`)
                        }
                    }}
                >
                    <WhatsappSvg/>
                    Fale com uma atendente
                </Box>
            </Container>
            <Box
                component="footer"
                sx={{
                    backgroundColor: "#F6EEF3",
                    width: "100%",
                    paddingTop: "32px",
                    paddingBottom: "32px",
                    bottom: 0,
                    display: 'block'
                }}
            >
                <Container>
                    <Typography
                        variant="body2"
                        component="p"
                        sx={{
                            fontSize: '0.75rem',
                            textAlign: 'center',
                            color: '#1F141A',
                            opacity: '50%',
                        }}
                    >
                        Todos os Direitos Reservados à Liss Fitness © 2025. <br/>16.801.255/0001-93
                    </Typography>
                </Container>
            </Box>
        </Box>
    )
}
