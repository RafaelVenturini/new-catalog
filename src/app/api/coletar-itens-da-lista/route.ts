import {connection} from "../../../../database";

interface ParamObj {
    id: number;
    qntd: number;
}

interface Row{
    tiny_id: number;
    nome: string;
    preco: number;
    img: string;
    estoque: number;
    cor: string;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
export async function GET(req) {
    const reqI = req.nextUrl.searchParams.get('i')
    const ids = reqI.split(',')
    console.log('ids:',ids);

    const paramObj:ParamObj[] = ids.map((id: string) => {
        const x =id.split('_')
        return {
            id: Number(x[1]),
            qntd: Number(x[0]),
        }
    })

    const onlyId = paramObj.filter((x)=> x.id).map(x => x.id)

    const [rows] = await connection.execute(`
        SELECT
            p.nome,
            IF(p.promocao > 0, p.promocao, p.preco) as preco,
            p.img,
            ca.estoque,
            p.tiny_id,
            IF(p.mul_id IS NULL, co.nome, m.nome) AS cor
        FROM produto p
            JOIN catalogo ca ON p.sku = ca.sku
            LEFT JOIN cor co ON p.cor_id = co.cor_id
            LEFT JOIN multcor m ON p.mul_id = m.mult_id
        WHERE tiny_id IN (${onlyId.join(',')})
    `)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const itens = rows.map((row:Row) => {
        const cor = row.cor.replace('Bicolor ', '').replace('Tricolor ', '')

        return {
            id: row.tiny_id,
            nome: row.nome.replace(cor, ''),
            preco: row.preco,
            img: row.img.replaceAll('[', '').replaceAll(']', '').replaceAll('"', '').split(',')[0],
            estoque: row.estoque,
            cor: cor,
            qntd: paramObj.find(x => x.id === row.tiny_id)?.qntd
        }
    })

    return new Response(JSON.stringify({ itens }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
