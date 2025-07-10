import {NextResponse} from 'next/server';
import {connection} from "../../../../database";

export async function GET() {
    try {
        const [rows] = await connection.execute(`
            SELECT
                p.nome,
                p.sku,
                p.preco,
                p.img,
                c.reposicao,
                c.novidade,
                c.prioridade,
                cor.nome cor,
                cor.hex as hex
            FROM produto p
                     JOIN catalogo c ON p.sku = c.sku
                     JOIN cor ON p.cor_id = cor.cor_id
        `)
        console.log(rows);
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json(
            {error: 'Failed to fetch catalog data', reason: error},
            {status: 500}
        );
    }
}
