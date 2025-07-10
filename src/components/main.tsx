"use client"
import {useEffect, useState} from "react";
import {MainProducts} from "@components/product-list/main-products";
import {MainMenu} from "@components/main-menu/main-menu";
import {Box} from "@mui/material";
import {productList, rawProductList} from "@components/interfaces";
import {Category} from "@components/interfaces";

export function Index() {
    const [category,setCategory] = useState<Category | null>()
    const [rawProductList,setRawProductList] = useState<rawProductList[]>([])
    const [newProductList,setNewProductList] = useState<productList[]>([])

    // useEffect(() => {
    //     fetch('/api/coletar-catalogo')
    //         .then(res => res.json())
    //         .then(data => setRawProductList(data))
    //         .catch(err => console.log(err))
    // }, []);

    useEffect(() => {
        fetch('/api/coletar-tudo')
            .then(res => res.json())
            .then(data => setRawProductList(data))
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        const newProductList: productList[] = []
        rawProductList.forEach(item => {
            const skuSegmentado = item.sku.split('-')
            const skuBase = skuSegmentado.slice(0,-1).join('-')
            const idx = newProductList.findIndex(x => x.sku === skuBase)
            if(idx === -1) {
                newProductList.push(
                    {
                        nome: item.nome,
                        sku:skuBase,
                        preco:parseFloat(item.preco),
                        prioridade:item.prioridade,
                        variation:[
                            {
                                img: item.img,
                                reposicao: item.reposicao,
                                novidade: item.novidade,
                                cor: item.cor,
                                sku: skuSegmentado[skuSegmentado.length - 1],
                                hex: item.hex
                            }
                        ]
                    }
                )
            }else{
                newProductList[idx].variation.push({
                    img: item.img,
                    reposicao: item.reposicao,
                    novidade: item.novidade,
                    cor: item.cor,
                    sku: skuSegmentado[skuSegmentado.length - 1],
                    hex: item.hex
                })
            }
        })
        setNewProductList(newProductList)
    }, [rawProductList]);

    return(
        <Box>
            {category ?
                <MainProducts key="Products" stockItens={newProductList} category={category} backOn={setCategory}/>
                : <MainMenu key="Menu" chosenCategory={setCategory}/>
            }
        </Box>
    )
}