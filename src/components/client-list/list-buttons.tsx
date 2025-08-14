"use client"
import {colors, vendedoras} from "@components/util";
import {Backdrop, Badge, Box} from "@mui/material";
import {useState} from "react";
import {OpenList} from "@components/client-list/list";
import {useList} from "@components/listContext";

export function OpenListButton() {
    const [open, setOpen] = useState(false)

    const {getQntd} = useList()

    const handleOpen = () => setOpen(true)
    const handleCloseAction = () => setOpen(false)
    const transform = getQntd() > 0 ? 'translateY(0px)' : 'translateY(86px)'
    return (
        <>
            <Box
                sx={{
                    position: 'fixed',
                    bottom: '32px',
                    left: '0',
                    right: '0',
                    zIndex: '30',
                    textAlign: 'center',
                    lineHeight: '1',
                    transition: 'transform .6s cubic-bezier(0.8, -0.5, 0.2, 1.5)',
                    transform: transform,
                }}
            >
                <Badge
                    color="error"
                    badgeContent={getQntd()}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            color: colors.brandPrimary,
                            fontSize: '1rem',
                            padding: '16px',
                            backgroundColor: '#FFFFFF',
                            display: 'inline-block',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px 0 #00000026',
                        }}
                        onClick={() => handleOpen()}
                    >
                        Sua lista
                    </Box>
                </Badge>
            </Box>
            <Backdrop
                sx={{
                    zIndex: 40,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#00000080',
                    backdropFilter: 'blur(8px)',
                    padding: '20px',
                    gap: '40px'
                }}
                open={open}
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        handleCloseAction()
                    }
                }}
            >
                <OpenList handleCloseAction={handleCloseAction}/>
                <SendListButton/>
            </Backdrop>
        </>
    )
}

export function SendListButton() {
    const {getListData} = useList()

    const handleSend = async () => {
        const listData = getListData()
        const url = window.location.host
        let param = ''
        let zap = localStorage.getItem('vend')
	    if(!zap) { zap = Math.floor(Math.random() * 3).toString()}
	    const numZap = vendedoras.find(x => x.id === parseInt(zap))?.num
        listData.list.forEach((item, i) => {
            if (i === listData.list.length - 1) {
                param += `id=${item.qntd}_${item.tiny_id}`
            } else {
                param += `id=${item.qntd}_${item.tiny_id}&`
            }
        })
        let listLink = `${url}/lista?`
        listLink += param
        window.open(`https://api.whatsapp.com/send?phone=5527${numZap}&text=${listLink.replaceAll('&', '%26')}`, '_blank')
    }

    return (
        <Box className="btn btn-primary btn-sm" onClick={handleSend}>
            Enviar lista para atendente
        </Box>
    )
}












































