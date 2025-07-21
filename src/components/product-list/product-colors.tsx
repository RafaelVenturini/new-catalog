import {Box} from "@mui/material";

interface Props {
    hex: string
    idx: number
    changeColor: (idx: number) => void
    actualIdx: number
}

export function ProductColors({hex, idx, changeColor, actualIdx}: Props) {
    const hexCodes = hex.split(', ')
    let className = "swatch-color"
    if (idx === actualIdx) {
        className += " color-selected"
    }
    if (hexCodes.length > 1) {
        if (hexCodes[2]) {
            return (
                <Box
                    sx={{
                        backgroundImage: `
                            conic-gradient(
                                #${hexCodes[0]} 0deg 120deg,
                                #${hexCodes[1]} 120deg 240deg,
                                #${hexCodes[2]} 240deg 0deg
                            )
                        `
                    }}
                    className={className}
                    onClick={() => changeColor(idx)}>
                </Box
                >
            )
        } else {
            return (
                <Box
                    className={className}
                    onClick={() => changeColor(idx)}
                >
                    <Box className='bicolor'>
                        <Box sx={{backgroundColor: '#' + hexCodes[0]}} className="bicolor-segment"></Box>
                        <Box sx={{backgroundColor: '#' + hexCodes[1]}} className="bicolor-segment"></Box>
                    </Box>
                </Box>
            )
        }
    } else {
        return (
            <Box
                sx={{backgroundColor: '#' + hexCodes[0]}}
                className={className}
                onClick={() => changeColor(idx)}>
            </Box>
        )
    }


}