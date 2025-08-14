"use client"
import {Highlights, productList, rawProductList} from "@components/interfaces";

export function toBRL(num: number | string) {
    return num.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
    });
}

export function toPix(num: number | string){
    if(typeof num === 'string') num = parseFloat(num)

    return toBRL(num * 0.9090909090909)
}

export const colors = {
    brandPrimary: "#BF208F"
}

export const vendedoras = [
    {id: 0, num: '996921314', name: 'Site'},
    {id: 1, num: '996711314', name: 'Nicoly'},
    {id: 2, num: '995067359', name: 'Ramone'},
    {id: 3, num: '996921314', name: 'Lorrayne'},
]

export function adaptProductToList(item: productList, index: number) {
    const variation = item.variation[index]
    const sku = `${item.sku}-${variation.sku}`
    return {
        sku: sku,
        nome: item.nome,
        cor: variation.cor.replace('Bicolor ', '').replace('Tricolor ', ''),
        preco: item.promocao > 10 ? item.promocao : item.preco,
        qntd: 1,
        tiny_id: variation.tiny_id,
        outOfStock: false,
        img: variation.img
            .replaceAll('[', '')
            .replaceAll(']', '')
            .replaceAll('"', '')
            .split(',')[0]
    }
}

export function adaptRawProductToNew(rawProductList: rawProductList[]) {
    const newProductList: productList[] = []
    const newHighlights: Highlights[] = []
    rawProductList.forEach(item => {
        const skuSegmentado = item.sku.split('-')
        const skuBase = skuSegmentado.slice(0, -1).join('-')
        const nomeBase = item.nome
            .replace(
                item.cor
                    .replace('Bicolor ', '')
                    .replace('Tricolor ', '')
                , '')
        const idx = newProductList.findIndex(x => x.nome === nomeBase && x.sku === skuBase)
        if (item.destaque) {
            newHighlights.push({
                    img: item.img
                        .replaceAll('[', '')
                        .replaceAll(']', '')
                        .replaceAll('"', '')
                        .split(',')[0],
                    tamanho: skuSegmentado[skuSegmentado.length - 2],
                    type: skuBase[0]
                }
            )
        }
        if (idx === -1) {
            newProductList.push(
                {
                    nome: nomeBase,
                    sku: skuBase,
                    preco: parseFloat(item.preco),
                    prioridade: item.prioridade,
                    promocao: item.promocao,
                    variation: [
                        {
                            tiny_id: item.tiny_id,
                            img: item.img,
                            reposicao: item.reposicao,
                            novidade: item.novidade,
                            cor: item.cor,
                            sku: skuSegmentado[skuSegmentado.length - 1],
                            hex: item.hex
                        }
                    ],
                }
            )
        } else {
            newProductList[idx].variation.push({
                tiny_id: item.tiny_id,
                img: item.img,
                reposicao: item.reposicao,
                novidade: item.novidade,
                cor: item.cor,
                sku: skuSegmentado[skuSegmentado.length - 1],
                hex: item.hex
            })
            if (newProductList[idx].prioridade < item.prioridade) {
                newProductList[idx].prioridade = item.prioridade
            }
        }
    })
    return {
        productList: newProductList,
        highlights: newHighlights
    }
}
