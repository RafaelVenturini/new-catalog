import {Container, Grid, Typography} from "@mui/material";
import {CategoryButton, MenuTop} from "./menu-options";
import {Category} from "@components/interfaces";

interface Props {
    chosenCategory: (value: Category) => void
}

export function MainMenu({chosenCategory}: Props) {
    const categorys = [
        {id:0,  typ:'L',    label:'Legging e Top Tamanho Único'},
        {id:1,  typ:'L',    label:'Legging e Top Plus Size'},
        {id:2,  typ:'S',    label:'Short e Top Tamanho Único'},
        {id:3,  typ:'S',    label:'Short e Top Plus Size'},
        {id:4,  typ:'M',    label:'Macacões e Macaquinhos Tamanho Único'},
        {id:5,  typ:'M',    label:'Macacões e Macaquinhos Plus Size'},
        {id:6,  typ:'B',    label:'Blusas e Regatas Tamanho Único'},
        {id:7,  typ:'B',    label:'Blusas e Regatas Plus Size'},
    ]

    return(
        <Container>
            <MenuTop/>

            <Typography variant="h6" component="h2">Navegue pelas Categorias</Typography>
            <Grid container spacing={2}>
                {categorys.map(item => (
                    <CategoryButton
                        key={item.id}
                        chosenCategory={chosenCategory}
                        category={item}
                        imgLink="https://s3.amazonaws.com/tiny-anexos-us/erp/ODQ3ODU5MjMy/4fb3c59f8b1f898346bdd52883a3e27b.webp"
                    />
                ))}
            </Grid>
        </Container>
    )
}