import {Box, Divider, Typography} from "@mui/material";
import {ProductColors} from "./product-colors";
import {SwiperOuter} from "./swipers";
import {productList} from "@components/interfaces";
import {useState} from "react";
import {toBRL,toPix} from "@components/util";

interface Props {
    product: productList
}

export function ProductArticle({product}: Props) {
    const [slideIdx,setSlideIdx] = useState<number>(0)

    const changeColor = (idx: number) => {
        setSlideIdx(idx)
    }

    const actualColor = product.variation[slideIdx].cor
        .replace('Bicolor ','')
        .replace('Tricolor ','')

    const firstColor = product.variation[0].cor

    return(
            <Box component="article" key="Produto-sku" height="95%">
                <Typography
                    variant="h5"
                    component="h2"
                >
                    {product.nome.replace(firstColor,'')}
                    <span style={{opacity:.5}}>{actualColor}</span>
                </Typography>
                <Box key="product-prices">
                    <Typography variant="body1" className="flex items-center gap-4">
                        <span style={{fontSize:"1.125rem", fontWeight:500}}>{toPix(product.preco)}</span>
                        <span className="badge-pix">no PIX</span>
                        <span style={{opacity:0.5}}>ou até 3× de {toBRL(product.preco / 3)}</span>
                    </Typography>
                </Box>
                <Box
                    className="flex flex-wrap gap-3"
                    key="product-colors"
                    sx={{width: "100%", height: "100%"}}
                >
                    {
                        product.variation.map((variation,idx) => (
                            <ProductColors
                                idx={idx}
                                hex={variation.hex}
                                key={variation.sku}
                                changeColor={changeColor}
                            />
                        ))
                    }
                </Box>
                <SwiperOuter data={product.variation} colorIdx={slideIdx} setActualIndex={setSlideIdx}/>
                <Divider sx={{my:2, width: '100%', height: 1}}/>
            </Box>
        )
}