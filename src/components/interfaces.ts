import {StaticImageData} from "next/image";

export interface rawProductList {
    tiny_id: number,
    nome: string,
    sku: string,
    preco: string,
    img: string,
    reposicao: boolean,
    novidade: boolean,
    prioridade: number,
    promocao: number,
    cor: string,
    hex: string,
    destaque: boolean,
    error: string | null,
}

export interface productList {
    nome: string,
    sku: string,
    preco: number,
    promocao: number,
    prioridade: number,
    variation: variations[],
}

export interface variations {
    tiny_id: number
    img: string,
    reposicao: boolean,
    novidade: boolean,
    cor: string,
    sku: string,
    hex: string
}

export interface Category {
    id: number,
    typ: string,
    label: string[],
}

export interface CategoryHighlights {
    id: number,
    typ: string,
    label: string[],
    img: string | StaticImageData
}

export interface Highlights {
    img: string,
    tamanho: string,
    type: string
}

export interface Lista {
    tiny_id: number,
    sku: string,
    qntd: number,
    nome: string,
    cor: string,
    preco: number,
    img: string,
    outOfStock: boolean,
}