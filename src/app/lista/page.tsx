import {FinalList} from "@components/client-list/final-list";
import {Suspense} from "react";
import {Typography} from "@mui/material";
import {PromiseSearchParams} from "@components/util";
export default async function main({searchParams}: PromiseSearchParams){
	const resolvedSearchParams = await searchParams;
    return(
		<Suspense fallback={<Typography> Aguarde enquanto Carregamos sua lista! </Typography>}>
            <FinalList searchParams={resolvedSearchParams}/>
		</Suspense>
    )
}