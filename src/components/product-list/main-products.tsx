import {Box, Button, CircularProgress, Container, Paper, Typography} from "@mui/material";
import {ProductArticle} from "@components/product-list/product-article";
import {ArrowLeft} from "lucide-react";
import {Category, productList} from "@components/interfaces";
import {useEffect, useState} from "react";
import {colors} from "@components/util";
import {MenuBottom} from "@components/main-menu/menu-options";

interface Props {
    backOn: (value: Category | null) => void
    category: Category
    stockItens: productList[]
}

export function MainProducts({backOn,category,stockItens}: Props) {
    const [filtredItens, setFiltredItens] = useState<productList[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const observerOptions = {
            rootMargin: '-84px 0px -50px 0px',
            threshold: 0.4 
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.target instanceof HTMLElement) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('on-screen')
                    } else{
                        entry.target.classList.remove('on-screen')
                    }
                }
            })
        },observerOptions)

        const productComponents = document.querySelectorAll('.wrapper-product')
        productComponents.forEach(product => observer.observe(product))

        return () => {
            productComponents.forEach(product => observer.unobserve(product))
        }
    }, [filtredItens]);

    useEffect(() => {
        setLoading(true)
        let filtred = stockItens
        if (category.id >= 0) {
            if (category.id % 2 === 0) {
                filtred = filtred.filter(item => item.sku.includes('TU'))
                console.log('Tamanho Unico')
            } else {
                filtred = filtred.filter(item => item.sku.includes('TP'))
                console.log('Tamanho Plus')
            }

            if (category.typ === 'B') {
                filtred = filtred.filter(item => ['B', 'C', 'R'].includes(item.sku[0]))
                console.log('Blusas e wharever')
            } else {
                filtred = filtred.filter(item => category.typ.includes(item.sku[0]))
                console.log('nao é blusa, é: ', category.typ)
            }
        } else {
            filtred = filtred
                .filter(item => item.variation
                    .some(cor => cor.novidade))
                .map(produto =>
                    ({...produto, variation: produto.variation.filter(cor => cor.novidade)}))
        }
        console.log('filtred: ', filtred)
        setFiltredItens(filtred)
        setLoading(false)
    }, [category, stockItens]);

    return(
        <Box>
            {loading ?
                <Box
                    className="load-holder"
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: "flex",
                        height: '100vh',
                        width: '100vw',
                    }}
                >
                    <CircularProgress size={128}/>
                </Box> :
                <>
                    <Paper
                        key="Header"
                        sx={{
                            width: "100%",
                            lineHeigh: 1,
                            backgroundColor: '#FFF',
                            padding: '24px 0.875rem',
                            boxShadow: '0, 4, 6 rgba(0, 0, 0, 0.1)',
                        }}
                        className="flex items-center justify-between fixed top-0 z-10 left-0"
                    >
                        <Box className="flex items-center">
                            <Button onClick={() => backOn(null)}>
                                <ArrowLeft color={colors.brandPrimary}/>
                            </Button>
                            <Typography variant="h5" component="h1">
                                {category.label.join(' ')}
                            </Typography>
                        </Box>
                    </Paper>
                    <Container sx={{paddingTop: '90px', marginTop: '2rem'}}>
                        {filtredItens.map(item => (
                            <Box key={item.nome.includes('Bicolor') ? item.sku + " Bic" : item.sku}>
                                <ProductArticle product={item}/>
                            </Box>
                        ))}
                    </Container>
                    <MenuBottom/>
                </>
            }
        </Box>
    )
}