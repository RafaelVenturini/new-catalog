"use client"
import {Box, Divider, Paper, Typography} from "@mui/material";
import {X, ArrowLeft} from 'lucide-react'
import {colors} from '@components/util'
import {useRouter} from "next/navigation";


interface Props {
    handleCloseAction: () => void,
}

export function ListHeader({handleCloseAction}: Props) {
    return (
        <>
            <Box component="header" key="listHeader"
                 sx={{display: 'flex', justifyContent: 'space-between', padding: '16px 24px', alignItems: 'center'}}>
                <Typography component="h2" variant="h6">Sua lista</Typography>
                <Box onClick={handleCloseAction}
                     sx={{color: colors.brandPrimary, display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
                    <X className="icon-brand-color" size={20}/>
                    Fechar
                </Box>
            </Box>
            <Divider/>
        </>
    )
}

interface OutProps{
    out: number
}

export function WarnOutOfStock({out}: OutProps) {

    return (
        <Box className="warning-out-of-stock">
            <Typography component="div" sx={{fontSize: '0.875rem'}}>
                {
                    out > 1 ?
                        `${out} itens foram removidos da lista porque sairam de estoque. Revise seus itens antes de fechar o pedido.` :
                        `${out} item foi removido da lista porque saiu de estoque. Revise seus itens antes de fechar o pedido.`
                }
            </Typography>
        </Box>
    )
}

export function FinalListHeader(){

    const router = useRouter()
    const backToIndex = () => router.push('/')

    return(
        <Paper
            component="header"
            sx={{
                display: "flex",
                justifyContent: "space-between",
                position: "fixed",
                top: "0",
                left: "0",
                right: "0",
                zIndex: "10000",
                alignItems: "center",
                lineHeight: "1",
                backgroundColor: "#fff",
                paddingLeft: "0.875rem",
                paddingRight: "0.875rem",
                paddingTop: "24px",
                paddingBottom: "24px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap:'.75rem'
                }}
            >
                <Box onClick={backToIndex}><ArrowLeft className="icon-brand-color"/></Box>
                <Typography variant="h5" component="h1">Sua lista</Typography>
            </Box>
        </Paper>
    )
}