"use client"
import {useEffect, useState} from "react";
import {useList} from "@components/listContext";
import {PageLoad} from "@components/ui/loading";
import {Box, useMediaQuery} from "@mui/material";
import {adaptRawProductToNew, SearchParams} from "@components/util";
import {MainMenu} from "@components/main-menu/main-menu";
import {DesktopReturn} from "@components/main-menu/desktop-return";
import {OpenListButton} from "@components/client-list/list-buttons";
import {MainProducts} from "@components/product-list/main-products";
import {Category, Highlights, productList, rawProductList} from "@components/interfaces";


export function Index({searchParams} :SearchParams) {
    const [rawProductList,setRawProductList] = useState<rawProductList[]>([])
    const [newProductList,setNewProductList] = useState<productList[]>([])
    const [categoryReady, setCategoryReady] = useState<boolean>(false)
    const [highlights, setHighlights] = useState<Highlights[]>([])
    const [category, setCategory] = useState<Category | null>()
    const isDesktop = useMediaQuery('(min-width: 900px)')
    const [load, setLoad] = useState<boolean>(true)
    const {getListData, outOfStock} = useList()

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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        if (!rawProductList || rawProductList.error) {
            console.log(rawProductList)
        } else {
            const {productList,highlights} = adaptRawProductToNew(rawProductList)
            setHighlights(highlights)
            setNewProductList(productList.sort((a, b) => b.prioridade - a.prioridade))
            const tinyInStock = new Set(rawProductList.map(p => p.sku))
            const clientList = getListData()
            const tinyOutStock = clientList.list
                .filter(item => !tinyInStock.has(item.sku))
                .map(item => item.sku);
            tinyOutStock.forEach(sku => outOfStock(sku))
        }
    }, [rawProductList]);

    useEffect(() => {
		if (searchParams){
		    const id = Array.isArray(searchParams.vend) ? searchParams.vend[0] : searchParams.vend ?? '';
			
			if(id && ['3','2','1','0'].includes(id)) {
	            localStorage.setItem('vend', id);
	        }
	        else{
	            const local = localStorage.getItem('vend')
	            if (!local) {
	                const newNumber = Math.floor(Math.random() * 3)
	                localStorage.setItem('vend', newNumber.toString())
	            }
	        }
		}
    }, [searchParams]);

    useEffect(() => {
        if (newProductList.length > 1 && categoryReady) setLoad(false)
        else setLoad(true)
    }, [categoryReady, newProductList]);

    return(
        <Box component="main">
            {isDesktop && <DesktopReturn/>}
            {!isDesktop && load && <PageLoad/>}
            {!isDesktop ?
                category ?
                    <MainProducts key="Products" stockItens={newProductList} category={category} backOn={setCategory}/> :
                    <MainMenu key="Menu" chosenCategoryAction={setCategory} highlights={highlights} categoryReady={setCategoryReady}/>
                :null
            }
            <OpenListButton/>
        </Box>
    )
}