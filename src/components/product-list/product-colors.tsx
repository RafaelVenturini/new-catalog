import {Box} from "@mui/material";

interface Props {
    hex: string
    idx: number
    changeColor: (idx: number) => void
}

export function ProductColors({hex,idx, changeColor}: Props) {
    return(
        <Box
            sx={{
                position: 'relative',
                width: '20px',
                height: '20px',
                borderRadius: '9999px',
                border: '1.5px solid rgba(0, 0, 0, 0.1)',
                backgroundColor: `#${hex}`
            }}
            onClick={() => changeColor(idx)}
        ></Box>
    )
}