"use client"
import {useState} from "react";
import {SwiperOuter} from "./swipers";
import {ProductColors} from "./product-colors";
import {productList} from "@components/interfaces";
import {Box, Divider, Typography} from "@mui/material";
import {ProductPrices} from "@components/product-list/article-header";
import {Plus} from "lucide-react";
import {useList} from "@components/listContext";
import {adaptProductToList} from "@components/util";

interface Props {
    product: productList
}

export function ProductArticle({product}: Props) {
    const {addToList} = useList()
    const [slideIdx,setSlideIdx] = useState<number>(0)

    const changeColor = (idx: number) => {
        setSlideIdx(idx)
    }

    const actualColor = product.variation[slideIdx].cor
        .replace('Bicolor ','')
        .replace('Tricolor ','')

    const firstColor = product.variation[0].cor

    let promoObj = null
    if (product.promocao) {
        promoObj = {
            normalValue: product.preco,
            promoValue: product.promocao,
        }
    }

    const handleAddToList = () => {
        addToList(adaptProductToList(product, slideIdx))
    }

    return(
            <Box component="article" key="Produto-sku" height="95%" className="wrapper-product" sx={{opacity:0.2}}>
                <Typography
                    variant="h5"
                    component="h2"
                    sx={{marginBottom: '12px'}}
                >
                    {product.nome.replace(firstColor,'')}
                    <br/>
                    <span style={{opacity:.5}}>{actualColor}</span>
                </Typography>
                <ProductPrices baseValue={product.preco} promoValue={product.promocao}/>
                <Box
                    className="flex flex-wrap gap-3 product-colors-list"
                    key="product-colors"
                    sx={{width: "100%", height: "100%", marginBottom: '20px'}}
                >
                    {
                        product.variation.map((variation,idx) => (
                            <ProductColors
                                idx={idx}
                                hex={variation.hex}
                                key={variation.sku}
                                changeColor={changeColor}
                                actualIdx={slideIdx}
                            />
                        ))
                    }
                </Box>
                <SwiperOuter
                    data={product.variation}
                    colorIdx={slideIdx}
                    setActualIndexAction={setSlideIdx}
                    promo={promoObj}
                />
                <Box className="wrapperActions" sx={{
                    position: "relative",
                    zIndex: "3",
                    marginTop: "-28px",
                    marginBottom: "28px",
                    textAlign: "center",
                }}>
                    <Box
                        className="btn btn-sm btn-primary"
                        key="btn-comprar"
                        onClick={handleAddToList}
                    >
                        <Plus/>Adicionar à sua lista
                    </Box>
                </Box>
                <Divider sx={{my:2, width: '100%', height: 1}}/>
            </Box>
        )
}