import {Index} from "@components/main";
import {HeaderSEO} from "@components/HeaderSEO";
import {Suspense} from "react";
import {Typography} from "@mui/material";

export default function main({
	                             searchParams
                             }: {
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	return(
		<>
			<HeaderSEO/>
			<Suspense fallback={<Typography> Aguarde enquanto Carregamos o catálogo!</Typography> }>
				<Index key='index' searchParams={searchParams} />
			</Suspense>
		</>
	)
}