import {FinalList} from "@components/client-list/final-list";

export default function main({
	                             searchParams
                             }: {
	searchParams: { [key: string]: string | string[] | undefined }
}){
    return(
        <FinalList searchParams={searchParams}/>
    )
}