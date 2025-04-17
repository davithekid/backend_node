import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'loja_2md',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function getConnection() {
    return pool.getConnection();
}

// funcão para ler todos os registros
async function readAll(table, where = null) {
    const connection = await getConnection();
    try {
        let sql = `SELECT *FROM ${table}`;
        if (where) {
            sql += ` WHERE ${where}`
        }

        const [rows] = await connection.execute(sql);
        return rows;
    } catch (err) {
        console.error('Erro ao ler registros: ', err);
        throw err;
    } finally {
        connection.realease();
    }
}

// função para ler um registro específico
async function read(table, where) {
    const connection = await getConnection();
    try {
        let sql = `SELECT * FROM ${table}`;
        if (where) {
            sql += ` WHERE ${where}`;
        }

        const [rows] = await connection.execute(sql);
        return rows[0] || null;
    } catch (err) {
        console.error('Erro ao ler registros: ', err)
        throw err;
    } finally {
        connection.realease();
    }
}

// função para inserir dados
async function create(table, data) {
    const connection = await getConnection();
    try {
        const columns = Object.keys(data).join(', ');
        const placeholders = Array(Object.keys(data).length).fill('?').join(', ') // VALUES (?, ?, ?)
        // INSERT INTO cliente (nome, endereco, contato) VALUES (?, ?, ?)
        const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})` // aqui criamos nossa query

        const values = Object.values(data);

        const [result] = await connection.execute(sql, values);

        return result.insertId;
    } catch (err) {
        console.error('Erro ao inserir registros: ', err)
        throw err;
    } finally {
        connection.realease();
    }
}

// função para atualizar um registro
async function update(table, data, where) {
    const connection = await getConnection();
    try {
        const set = Object.keys(data).map(column => `${column} = `).join(', ');

        const sql = `UPDATE ${table} SET ${set} WHERE ${where}`;
        const values = Object.values(data);

        const [result] = await connection.execute(sql, [...values]);
        return result.affectedRows

    } catch (err) {
        console.err('Erro ao atualizar registros: ', err)
    } finally {
        connection.realease();
    }
}

// função para deletar um registro
async function deleteRecord(table, where) {
    const connection = await getConnection();
    try {
        const sql = `DELETE FROM ${table} WHERE ${where}`;
        const [result] = await connection.execute(sql);
        return result.affectedRows;
    } catch (err) {
        console.err('Erro ao deletar registros: ', err)
    } finally {
        connection.realease();
    }
}
                                                    // exportando deleteRecords como delete
export default { create, readAll, read, update, delete: deleteRecord }



