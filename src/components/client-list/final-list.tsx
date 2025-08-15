"use client"
import {Box} from "@mui/material";
import {useEffect, useState} from "react";
import {EmptyList} from "@components/client-list/empty-list";
import {FinalListHeader, WarnOutOfStock} from "@components/client-list/list-header";
import {FinalListRow} from "@components/client-list/list-row";
import {ListFooter} from "@components/client-list/list-footer";
import {SearchParams} from "@components/util";

interface Itens{
    nome:string,
    preco:number,
    estoque:boolean,
    img:string,
    tiny_id:number
    cor:string
    qntd:number
}

interface Footer{
    qntd:number,
    total:number
}

export function FinalList({searchParams} : SearchParams) {
    const [itens, setItens] = useState<Itens[]>([])
    const search = searchParams.id
    const [outOfStock, setOutOfStock] = useState<number>(0)
    const [footer, setFooter] = useState<Footer>({qntd:0, total:0})

    useEffect(() => {
        if (search && search.length > 0){
            console.log('[search] Params: ',search)

            fetch(`api/coletar-itens-da-lista?i=${search}`)
                .then(r => r.json())
                .then(r => {
                    const f = r.itens.filter((x:Itens) => x.estoque)
                    const qntd = f.reduce((acc:number, x:Itens) => acc + x.qntd, 0)
                    const total = f.reduce((acc:number, x:Itens) => acc + x.preco * x.qntd, 0)
                    console.log('[search] ItensF: ',f)
                    console.log('[search] ItensQntd: ',qntd)
                    console.log('[search] ItensTotal: ',total)
                    setItens(r.itens)
                    setFooter({qntd, total})
                    setOutOfStock(r.itens.length - f.length)
                })
        }
    }, [search]);

    console.log('[search] Itens: ',itens)
    return(
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                paddingTop: '100px',
                justifyContent: 'space-between',
	            backgroundColor: "#000"
            }}
        >
            <Box
                sx={{
	                backgroundColor: "#000",
                    flex:1,
                    minHeight:0,
                    overflowY: 'scroll',
	                maxHeight: '65%'
                }}
            >
                <FinalListHeader/>
                {outOfStock    > 0 ? <WarnOutOfStock out={outOfStock}/> : null}
	            {search && search.length > 0 ?
		            (
			            <>
				            {itens.map(x => (
					            <FinalListRow key={x.tiny_id} lista={x}/>
				            ))}
				            <ListFooter qntd={footer.qntd} total={footer.total}/>
			            </>
		            ) :
		            (<EmptyList/>)
	            }
            
            </Box>
        </Box>
    )
}