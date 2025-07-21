import {Box, Typography} from "@mui/material";
import {toBRL, toPix} from "@components/util";
import {PixBadge} from "@components/ui/badges";

interface Props {
    baseValue: number,
    promoValue: number | null,
}

export function ProductPrices({baseValue, promoValue}: Props) {
    const finalValue = promoValue && promoValue > 0 ? promoValue : baseValue

    return (
        <Box key="product-prices" sx={{marginBottom: '20px'}}>
            {
                promoValue === finalValue ?
                    <Typography variant="body1" className="flex items-center gap-4 discount-sayings">
                        De <span className="oldPrice">{toPix(baseValue)}</span> por
                    </Typography>
                    : null
            }
            <Typography variant="body1" className="flex items-center gap-4">
                <span style={{
                    fontSize: "1.125rem",
                    fontWeight: 500
                }}>{toPix((finalValue))}</span>
                <PixBadge/>
                <span style={{opacity: 0.5}}>ou até 3× de {toBRL((finalValue) / 3)}</span>
            </Typography>
        </Box>
    )
}