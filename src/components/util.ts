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