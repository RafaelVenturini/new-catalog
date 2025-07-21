import {Box, Typography} from "@mui/material";

interface discountProp {
    normalValue: number,
    promoValue: number,
}

export function DiscountBadge({normalValue, promoValue}: discountProp) {
    const percent = 1 - (promoValue / normalValue)
    return (
        <Box
            className="badge-products badge-discount"
            sx={{
                color: '#FFF',
                backgroundColor: '#FF0048',
                padding: '16px 13px',
                borderRadius: '8px',
                lineHeight: '1.125',
                fontSize: '1rem',
                fontWeight: '500',
            }}
        >
            -{Math.ceil(percent * 100)}%
        </Box>
    )
}

export function NewerBadge() {
    return (
        <Box
            className="badge-products badge-new-arrivals"
            sx={{
                backgroundColor: "#FFFFFF",
                padding: '16px 13px',
                borderRadius: '8px',
                lineHeight: '1.125',
                fontSize: '1rem',
                fontWeight: '500',
            }}
        >
            <Typography
                sx={{
                    backgroundImage: "linear-gradient(to right top, var(--brand-primary), #F9BB92)",
                    color: "transparent",
                    backgroundClip: "text",
                }}
            >
                Novidade
            </Typography>
        </Box>
    )
}

export function PixBadge() {
    return (
        <span className="badge-pix">no PIX</span>
    )
}
