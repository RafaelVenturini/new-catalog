"use client"
import {Index} from "@components/main";
import {HeaderSEO} from "@components/HeaderSEO";

export default function main({
	                             searchParams
                             }: {
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	return(
		<>
			<HeaderSEO/>
			<Index key='index' searchParams={searchParams} />
		</>
	)
}