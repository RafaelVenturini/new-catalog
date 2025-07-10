import {Box, Button, Grid, Typography} from "@mui/material";
import Image from "next/image";
import {LogoSvg} from "@components/ui/svg";
import {Category} from "@components/interfaces";

export function MenuTop() {
    return(
        <Box component="section" className="intro">
            <Typography
                component="h1"
                variant="h1"
                fontSize="1rem"
                lineHeight="1"
                letterSpacing="0.2em"
                marginBottom="24"
            >
                CATÁLOGO
            </Typography>
            <Box>
                <LogoSvg/>
            </Box>
        </Box>
    )
}

interface Props {
    chosenCategory: (value: Category) => void
    category: Category
    imgLink: string
}

export function CategoryButton({chosenCategory,category,imgLink}: Props){
    return(
        <Grid size={6}
              component="article"
              onClick={() => chosenCategory(category)}
        >
            <Image src={imgLink} alt="" width={1600} height={1600}/>
            <Typography variant="h6" component="h3">{category.label}</Typography>
            <Button>Ver Produtos -{">"}</Button>
        </Grid>
    )
}