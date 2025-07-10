import {Box, Button, Container, Paper, Typography} from "@mui/material";
import { ProductArticle } from "@components/product-list/product-article";
import {ArrowLeft, Menu} from "lucide-react";
import {productList} from "@components/interfaces";
import {Category} from "@components/interfaces";
import {useEffect, useState} from "react";

interface Props {
    backOn: (value: Category | null) => void
    category: Category
    stockItens: productList[]
}

export function MainProducts({backOn,category,stockItens}: Props) {
    const [filtredItens,setFiltredItens] = useState<productList[]>(stockItens)

    useEffect(() => {
        let filtred = stockItens
        if (category.id % 2 === 0){
            filtred = filtred.filter(item => item.sku.includes('TU'))
            console.log('Tamanho Unico')
        }
        else{
            filtred = filtred.filter(item => item.sku.includes('TP'))
            console.log('Tamanho Plus')
        }

        if (category.typ === 'B'){
            filtred = filtred.filter(item => ['B','C','R'].includes(item.sku[0]))
            console.log('Blusas e wharever')
        }else {
            filtred = filtred.filter(item => category.typ.includes(item.sku[0]))
            console.log('nao é blusa, é: ',category.typ)
        }
        setFiltredItens(filtred)
    }, [category, stockItens]);
    return(
        <Box>
            <Paper
                key="Header"
                sx={{width: "100%", height: 100}}
                className="flex items-center justify-between fixed top-0 z-10 left-0"
            >
                <Box className="flex items-center">
                    <Button onClick={() => backOn(null)}> <ArrowLeft/> </Button>
                    <Typography variant="h6" component="h1" className="h5">{category.label}</Typography>
                </Box>
                <Button><Menu /></Button>
            </Paper>
            <Container>
                {filtredItens.map(item => (
                    <ProductArticle key={item.sku} product={item}/>
                ))}
            </Container>
        </Box>
    )
}