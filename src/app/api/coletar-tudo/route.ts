import {NextResponse} from 'next/server';
import {connection} from "../../../../database";

export async function GET() {
    try {
        const [rows] = await connection.execute(`
            SELECT
                p.tiny_id,
                p.nome,
                p.sku,
                p.preco,
                p.promocao,
                p.img,
                FLOOR(RAND() * 2) as reposicao,
                ca.destaque,
                FLOOR(RAND() * 2) as novidade,
                FLOOR(RAND() * 6) as prioridade,
                IF(p.mul_id IS NULL, co.nome, m.nome) AS cor,
                IF(p.mul_id IS NULL, co.hex, mc.hex_cores) AS hex
            FROM produto p
                     JOIN catalogo ca ON p.sku = ca.sku
                     LEFT JOIN cor co ON p.cor_id = co.cor_id
                     LEFT JOIN multcor m ON p.mul_id = m.mult_id
                     LEFT JOIN (
                SELECT
                    m.mult_id,
                    TRIM(BOTH ', ' FROM CONCAT_WS(
                            ', ',
                            c1.hex,
                            c2.hex,
                            c3.hex
                                        )) AS hex_cores
                FROM multcor m
                         LEFT JOIN cor c1 ON c1.cor_id = m.cor_pri
                         LEFT JOIN cor c2 ON c2.cor_id = m.cor_sec
                         LEFT JOIN cor c3 ON c3.cor_id = m.cor_ter
            ) AS mc ON p.mul_id = mc.mult_id
            WHERE p.img <> '[]'
              AND (m.nome IS NOT NULL OR co.nome IS NOT NULL)
              AND p.nome NOT LIKE '%Nude%'
              AND p.tiny_id <> 889739774
            ;
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
