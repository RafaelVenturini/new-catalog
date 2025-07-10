import mysql from 'mysql2/promise'

export const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'catalogo',
    password: 'catalogando',
    database: 'liss_fitness',
    pool: true,
    waitForConnections: true,
    connectionLimit: 0,
    queueLimit: 0,
})