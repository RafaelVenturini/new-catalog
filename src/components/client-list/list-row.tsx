import {Box, Typography} from "@mui/material";
import {Minus, Plus} from "lucide-react";
import Image from "next/image";
import {toPix} from "@components/util";
import {Lista} from "@components/interfaces";
import {useList} from "@components/listContext";

interface Props {
    lista: Lista,
}

export function ListRow({lista}: Props) {
    const {changeQntd, removeOfList} = useList()
    const {nome, preco, qntd, cor, img, sku, tiny_id,outOfStock} = lista

    let stockCheck = "in-stock"

    if (outOfStock) stockCheck = "out-of-stock"

    return (
        <Box component="li" sx={{display: 'flex', flexDirection: 'row', padding: '16px 24px'}} key={tiny_id}>
            <Image src={img} alt='' width={64} height={64} className={`list-product-image ${stockCheck}`}/>
            <Box component="header" sx={{display: 'flex', flexDirection: 'column', paddingLeft: '16px', width: '100%'}}>
                <Box>
                    <Typography className={stockCheck} component="span" variant="h6">{nome}</Typography>
                    <Typography className={stockCheck} component="span" variant="h6" sx={{opacity: 0.5}}>{cor}</Typography>
                </Box>
                <Box className="list-secondary-info"
                     sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box className="left"
                         sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px'}}>
                        <Box
                            className="input-item-quantity"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                border: '1px solid #0000000d',
                                borderRadius: '8px',
                                minWidth: '69px',
                                padding: '3px 4px',
                                fontSize: '0.75rem'
                            }}
                        >
                            <Minus
                                className="icon-brand-color"
                                size={10}
                                onClick={!outOfStock ?
                                    () => changeQntd(sku, qntd - 1) :
                                    () => console.log("Ação negada")}
                            />
                            {qntd}
                            <Plus
                                className="icon-brand-color"
                                size={10}
                                onClick={!outOfStock ?
                                    () => changeQntd(sku, qntd + 1) :
                                    () => console.log("Ação negada")}
                            />
                        </Box>
                        <Box className={`product-listed-price ${stockCheck}`}>
                            {toPix(preco * qntd)}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            opacity: 0.5,
                            fontSize: '0.75rem',
                            lineHeight: '1.3'
                        }}
                        onClick={() => removeOfList(sku)}
                    >
                        Remover
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

interface FinalListRowProps {
    lista: FinalList,
}

interface FinalList{
    nome: string,
    preco: number,
    qntd: number,
    cor: string,
    img: string,
    tiny_id: number,
    estoque: boolean,
}

export function FinalListRow({lista}: FinalListRowProps) {
    const {nome, preco, qntd, cor, img, tiny_id,estoque} = lista

    let stockCheck = "in-stock"

    if (!estoque) stockCheck = "out-of-stock"

    return (
        <Box component="li" sx={{display: 'flex', flexDirection: 'row', padding: '16px 24px'}} key={tiny_id}>
            <Image src={img} alt='' width={64} height={64} className={`list-product-image ${stockCheck}`}/>
            <Box component="header" sx={{display: 'flex', flexDirection: 'column', paddingLeft: '16px', width: '100%'}}>
                <Box>
                    <Typography className={stockCheck} component="span" variant="h6">{qntd} × {nome}</Typography>
                    <Typography className={stockCheck} component="span" variant="h6" sx={{opacity: 0.5}}>{cor}</Typography>
                </Box>
                <Box className="list-secondary-info"
                     sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box className="left"
                         sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px'}}>
                        <Box className={`product-listed-price ${stockCheck}`}>
                            {toPix(preco * qntd)}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}