import {Box, Link, Typography} from "@mui/material";
import {colors} from "@components/util";

export function DesktopReturn() {
    return (
        <Box
            className="warning-desktop"
            sx={{
                height: '100lvh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                overflow: 'hidden',
                position: 'relative',
                zIndex: 99999,
                backgroundColor: '#FFF'
            }}
        >
            <Box className="text-holder" sx={{maxWidth: '490px', position: 'relative'}}>
                <Typography component="h1" variant="h1" className="slide-in delay-0" sx={{marginBottom: '0.5em'}}>
                    Ei! 👋 <br/>Nosso catálogo é melhor visto pelo celular...
                </Typography>
                <Typography variant="subtitle1" component="p" className="slide-in delay-1">
                        Por esse dispositivo aqui, você pode ver e comprar nossos produtos na <Link sx={{textDecoration: 'none', color:colors.brandPrimary}}
                        href="https://lissfitness.com.br?utm_source=catalogo-online&utm_medium=aviso-desktop">loja
                        online oficial da Liss Fitness</Link>.
                </Typography>
            </Box>
        </Box>
    )
}