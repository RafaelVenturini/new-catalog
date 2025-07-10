export interface rawProductList{
    nome: string,
    sku: string,
    preco: string,
    img: string,
    reposicao: boolean,
    novidade: boolean,
    prioridade: number,
    cor: string
    hex: string,
}

export interface productList{
    nome: string,
    sku: string,
    preco: number,
    prioridade: number,
    variation: variations[],
}

export interface variations{
    img: string,
    reposicao: boolean,
    novidade: boolean,
    cor: string,
    sku: string,
    hex: string
}

export interface Category {
    id: number,
    typ:string,
    label:string
}