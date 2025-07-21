"use client"

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {Lista} from "@components/interfaces";

type ListData = {
    valorTotal: number,
    qntdTotal: number,
    list: Lista[]
}

type ListContextType = {
    list: Lista[],
    addToList: (item: Lista) => void,
    removeOfList: (item: string) => void,
    clearList: () => void,
    getQntd: () => number,
    getListData: () => ListData
    changeQntd: (sku: string, qntd: number) => void
    outOfStock: (sku: string) => void
    getOutOfStock: () => number
}

const ListContext = createContext<ListContextType | undefined>(undefined)

export const ListProvider = ({children}: { children: ReactNode }) => {
    const [list, setList] = useState<Lista[]>([])

    useEffect(() => {
        const storedList = localStorage.getItem('lista')
        if (storedList && storedList !== '[]') {
            const storedListParsed = JSON.parse(storedList)
            console.log('[storage] Storage encontrado')
            console.log('[storage] Storage: ', storedListParsed)
            setList(storedListParsed)
            console.log('[storage] Storage Armazenado')
        } else {
            console.log('[storage] Storage inicializado')
        }
    }, [])

    useEffect(() => {
        if (list.length === 0) {
            console.log('[storage] List Len = 0')
            return
        }
        localStorage.setItem('lista', JSON.stringify(list))
        console.log('[storage] Storage atualizado: ', list)
    }, [list]);

    const addToList = (item: Lista) => {
        console.log('[add] Adicionando item: ', item)
        setList(prev => {
            const exist = prev.find(x => x.sku === item.sku)
            if (exist) {
                return prev.map(x => x.sku === item.sku ? {...x, qntd: x.qntd + 1} : x)
            }
            return [...prev, item]
        })
        console.log('[add] Lista atualizada')
    }

    const removeOfList = (sku: string) => {
        setList(prev => prev.filter(x => x.sku !== sku))
        console.log(`[remove] Item: ${sku} foi removido da lista `)
    }

    const clearList = () => setList([])

    const getQntd = () => {
        return list.reduce((acc, item) => acc + item.qntd, 0)
    }

    const getListData = () => {
        let valorTotal = 0
        let qntdTotal = 0
        list.forEach(item => {
            if (!item.outOfStock) {
                valorTotal += item.preco * item.qntd
                qntdTotal += item.qntd
            }
        })
        return {valorTotal, qntdTotal, list}
    }

    const changeQntd = (sku: string, qntd: number) => {
        let remove = false
        setList(prev => (
            prev.map(x => {
                if (x.sku === sku) {
                    console.log(`[change] Item: ${sku} testando ${qntd} + ${x.qntd} = ${qntd + x.qntd}`)
                    if ((x.qntd + qntd) > -1) {
                        console.log(`[change] Item: ${sku} foi alterado para ${qntd}`)
                        return {...x, qntd}
                    } else {
                        console.log(`[change] Item: ${sku} será removido`)
                        remove = true
                    }
                }
                return x
            })
        ))
        if(remove) removeOfList(sku)
    }

    const outOfStock = (sku: string) => {
        const out = list.find(x => x.sku === sku)
        if (out) out.outOfStock = true
        console.log(`[out of Stock] item ${sku} está sem estoque`)
    }

    const getOutOfStock = () => {
        const out = list.filter(x => x.outOfStock)
        return out.length
    }

    return (
        <ListContext.Provider
            value={{
                list,
                addToList,
                removeOfList,
                clearList,
                getQntd,
                getListData,
                changeQntd,
                outOfStock,
                getOutOfStock,
            }}
        >
            {children}
        </ListContext.Provider>
    )
}

export const useList = () => {
    const ctx = useContext(ListContext)
    if (!ctx) {
        throw new Error('useList must be used within a ListProvider')
    }
    return ctx
}




































