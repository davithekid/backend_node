import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'

const pool = mysql.createPool({

    host: 'localhost',
    user: 'root',
    database: 'biblioteca_api',
    password: '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function getConnection() {
    return pool.getConnection();
}

//Função para ler todos os registros
async function readAll(table, where = null) {
    const connection = await getConnection();
    try {
        let sql = `SELECT * FROM  ${table}`
        if (where) {
            sql += ` WHERE ${where}` // ESSE ESPAÇO ANTES DO WHERE É ESSENCIAL
        }
        const [rows] = await connection.execute(sql);
        return rows
    } catch (err) {
        console.error('Erro ao ler o registros: ', err)
        throw err;
    } finally {
        connection.release();
    }
}


// Função para ler um unico registro
async function read(table, where) {
    const connection = await getConnection();
    try {
        let sql = `SELECT *FROM ${table}`;
        if (where) {
            sql += ` WHERE ${where}`
        }
        const [rows] = await connection.execute(sql);
        return rows[0] || null;
    } catch (err) {
        console.error('Erro ao ler o registros: ', err)
        throw err;
    } finally {
        connection.release()

    }
}


// Função para inserir dados
async function create(table, data) {
    const connection = await getConnection();
    try {
        const columns = Object.keys(data).join(', ') //Oject é uma função inerna para manipular objetos -- AQUI ELE PEGA SÓ A KEY DE UM OBJECT -- É RELEVANTE ', ' O ESPACÇO
        //(nome, email, endereco)
        const placeholders = Array(Object.keys(data).length).fill('?').join(', ') // aqui eu conto quantas keys são prencidas com "?" e juntar com ", " 
        //VALUES (?, ?, ?)
        const sql = `INSERT INTO ${table} (${columns}) VALUES(${placeholders})`;
        // INSERT INTO clintes (nome, email, endereco) VALUES (?, ?, ?)
        const values = Object.values(data)
        const [result] = await connection.execute(sql, values)
        return result.insertId
    } catch (err) {
        console.error("Erro ao inserir registros: ", err)
        throw err;
    } finally {
        connection.release();
    }
}


//Função para ataulizar um registro
async function update(table, data, where) {
    const connetion = await getConnection();
    try {
        const set = Object.keys(data).map(column => `${column} = ?`).join(', ');

        const sql = `UPDATE ${table} SET ${set} WHERE ${where}`
        const values = Object.values(data);

        const [result] = await connetion.execute(sql, [...values])
        return result.affectedRows;
    } catch (err) {
        console.error("Erro ao ataulizar registros: ", err)
        throw err;
    } finally {
        connetion.release();
    }
}

//Função para excluir um registro 
async function deleteRecord(table, where,) {
    const connetion = await getConnection();
    try {
        const sql = `DELETE FROM ${table} WHERE ${where}`
        const [result] = await connetion.execute(sql);
        return result.affectedRows;
    } catch (err) {
        console.error("Erro ao ataulizar registros: ", err);
        throw err;
    } finally {
        connetion.release();
    }

}

async function compare(senha, hash) {
        try {
            // comparação da senha com o hash usando o bccypt
            return await bcrypt.compare(senha, hash);
        } catch (err) {
            console.error('Erro ao comparar a senha com o hash: ', err)
            return false;
        }
}

export { create, readAll, read, update, deleteRecord, compare } //Estou exportando DELETRECORDR como DELETE, ent ela está renomeada