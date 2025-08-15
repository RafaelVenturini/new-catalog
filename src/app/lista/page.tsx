import {FinalList} from "@components/client-list/final-list";
import {Suspense} from "react";
import {Typography} from "@mui/material";
export default function main({
	                             searchParams
                             }: {
	searchParams: { [key: string]: string | string[] | undefined }
}){
    return(
		<Suspense fallback={<Typography> Aguarde enquanto Carregamos sua lista! </Typography>}>
            <FinalList searchParams={searchParams}/>
		</Suspense>
    )
}