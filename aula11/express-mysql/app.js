import express from "express";
import db from "./db.js";
const app = express ();
const port = 3000;
const API_URL = `http://localhost:${port}`;

app.get('/', (req, res) => {
    res.status(200).send('<h1>home</h1>')
})

app.get('/clientes', async (req, res) => {
    try {
        const[rows] = await db.query('SELECT *FROM cliente')
        res.json(rows)
    } catch (err){
        console.error('Erro ao obter clientes')
        res.status(500).send('Erro ao obter clientes')
    }
})

app.listen(port , () => {
    console.log(`Servidor rodando em ${API_URL}`);
})

// node --watch app.js

