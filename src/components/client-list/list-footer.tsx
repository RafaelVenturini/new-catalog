import {Box, Divider, Typography} from "@mui/material";
import {toBRL, toPix} from "@components/util";
import {PixBadge} from "@components/ui/badges";

interface Props {
    qntd: number,
    total: number,
}

export function ListFooter({qntd, total}: Props) {
    const primarySx = {
        fontSize: "1rem",
        lineHeight: "1.25",
    }
    const secondarySx = {
        fontSize: "0.75rem",
        lineHeight: "1.25",
        opacity: 0.5,
    }
    return (
        <>
            <Box
                component="footer"
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
	                					backgroundColor: '#FFFFFF',
                }}
            >
                <Divider/>
                <Box
                    component="footer"
                    key="listFooter"
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '16px 24px',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Box className="subtotal-list-sayings"
                         sx={{display: 'flex', alignItems: 'left', flexDirection: 'column'}}>
                        <Typography component="span" sx={primarySx}>Subtotal</Typography>
                        <Typography component="span" sx={secondarySx}>
                            {qntd > 1 ? `${qntd} itens, sem frete` : `${qntd} item, sem frete`}
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'right', flexDirection: 'column'}}>
                        <Box sx={primarySx}>
                            {toPix(total)} <PixBadge/>
                        </Box>
                        <Typography sx={secondarySx}>
                            ou até 3x de {toBRL(total / 3)}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}