import {Index} from "@components/main";
import {HeaderSEO} from "@components/HeaderSEO";
import {Suspense} from "react";
import {Typography} from "@mui/material";
import {PromiseSearchParams} from "@components/util";

export default async function main({searchParams}:PromiseSearchParams) {
	const resolvedSearchParams = await searchParams;
	return(
		<>
			<HeaderSEO/>
			<Suspense fallback={<Typography> Aguarde enquanto Carregamos o catálogo!</Typography> }>
				<Index key='index' searchParams={resolvedSearchParams} />
			</Suspense>
		</>
	)
}