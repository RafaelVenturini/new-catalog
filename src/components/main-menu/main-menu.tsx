import BTP from "@img/categorys-place-holder/blusas-e-regatas-plus-size.webp";
import BTU from "@img/categorys-place-holder/blusas-e-regatas-tamanho-unico.webp";
import {Category, CategoryHighlights, Highlights} from "@components/interfaces";
import MTP from "@img/categorys-place-holder/macacoes-e-macaquinhos-plus-size.webp";
import STP from "@img/categorys-place-holder/conjuntos-de-short-e-top-plus-size.webp";
import {Box, Container, Grid, Typography} from "@mui/material";
import LTP from "@img/categorys-place-holder/conjuntos-de-legging-e-top-plus-size.webp";
import MTU from "@img/categorys-place-holder/macacoes-e-macaquinhos-tamanho-unico.webp";
import STU from "@img/categorys-place-holder/conjuntos-de-short-e-top-tamanho-unico.webp";
import {CategoryButton, MenuBottom, MenuTop} from "./menu-options";
import LTU from "@img/categorys-place-holder/conjuntos-de-legging-e-top-tamanho-unico.webp";
import {useEffect} from "react";


interface Props {
    chosenCategoryAction: (value: Category) => void
    highlights: Highlights[]
    categoryReady: (value: boolean) => void
}

export function MainMenu({chosenCategoryAction, highlights, categoryReady}: Props) {
    const categories: CategoryHighlights[] = [
        {id: 0 , typ: 'L' , label: ['Legging + Top'          , 'Tamanho Único'] , img: LTU},
        {id: 1 , typ: 'L' , label: ['Legging + Top'          , 'Plus Size']     , img: LTP},
        {id: 2 , typ: 'S' , label: ['Short + Top '           , 'Tamanho Único'] , img: STU},
        {id: 3 , typ: 'S' , label: ['Short + Top'            , 'Plus Size']     , img: STP},
        {id: 4 , typ: 'M' , label: ['Macacões e Macaquinhos' , 'Tamanho Único'] , img: MTU},
        {id: 5 , typ: 'M' , label: ['Macacões e Macaquinhos' , 'Plus Size']     , img: MTP},
        {id: 6 , typ: 'B' , label: ['Blusas e Regatas'       , 'Tamanho Único'] , img: BTU},
        {id: 7 , typ: 'B' , label: ['Blusas e Regatas'       , 'Plus Size']     , img: BTP},
    ]
    
    let preCategoryReady = false

    highlights.forEach((high,idx) => {
        let list
        if (['B', 'R', 'C'].includes(high.type)) {
            list = categories.filter(cat => cat.typ === 'B')
        } else {
            list = categories.filter(cat => cat.typ === high.type)
        }
        if (['TP', 'G', 'GG'].includes(high.tamanho)) {
            list[1].img = high.img
        } else {
            list[0].img = high.img
        }
        if (idx === 6) {
            preCategoryReady = true
        }
    })

    useEffect(() => {
        categoryReady(true)
    }, [categoryReady, preCategoryReady]);
    
    return(
        <>
            <MenuTop chosenCategoryAction={chosenCategoryAction}/>
            <Box component="section">
                <Container className="product-list">
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                            marginBottom: '1.25rem',
                            fontSize: '1rem',
                            lineHeight: '1.2'
                        }}
                    >
                        Navegue pelas Categorias
                    </Typography>
                    <Grid container spacing={2} component='ul' sx={{gap: '40px 16px'}}>
                        {categories.map((item) => (
                            <CategoryButton
                                key={item.id}
                                chosenCategoryAction={chosenCategoryAction}
                                category={item}
                                imgLink={item.img}
                            />
                        ))}
                    </Grid>
                </Container>
            </Box>
            <MenuBottom/>
        </>
    )
}