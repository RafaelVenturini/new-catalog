import {Box, Link, Typography} from "@mui/material";
import Image from "next/image";
import example from "@img/example-adicionar-a-lista.webp"
import {ArrowLeft} from "lucide-react";

export function EmptyList() {
    return(
        <Box
            sx={{
                flex: '1 1 auto',
                padding: '20px 16px',
                height: '100%',
                overflowY: 'auto',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    textAlign: 'center',
                }}
            >
                <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                        marginBottom:"12px",
                        fontWeight:500,
                        fontSize:'1.75rem',
                        lineHeight:1.25
                    }}
                >
                    Ainda não há nenhum produto em sua lista...
                </Typography>
                <Typography
                    variant="body1"
                    component="p"
                    sx={{marginBottom:"40px",
                        opacity:0.5,
                        fontSize:'1rem',lineHeight:1.25,
                        overflowWrap: 'break-word'
                    }}
                >
                    Toque nos botões “Adicionar à sua lista” para incluir o produto em sua lista de desejo.</Typography>
                <Box>
                    <Image
                        src={example}
                        alt=""
                        style={{
                            borderRadius: "32px",
                            height: "auto",
                            maxWidth: "45vh",
                            backgroundColor: "#F5EEF6",
                        }}
                    />
                </Box>
                <Link sx={{display: 'flex', gap:'8px', alignItems:'center'}}><ArrowLeft/>Voltar à página anterior</Link>
            </Box>
        </Box>
    )
}