import express from "express";
import fs from 'fs';
import axios from "axios";
import  rotasFilmes  from './routers/rotasFilmes.js'
import rotasAdmin from './routers/rotasAdmin.js'
import { log } from "console";
const app = express();
const port = 3000;

const logger = (req, res, next) => {
    const data = new Date();
    console.log(`${data.toISOString()} ACESSANDO: ${req.method} ${req.url}`)
    next();

    const newLine = `${data.toISOString()} ACESSANDO: ${req.method} ${req.url}`;
    fs.appendFile('arquivo.txt', newLine, err => {
        if (err) throw err;
        console.log('Salvando logging')
    })
}
app.use(express.json());
app.use(logger)

// rota padrão
app.get('/' , (req, res) => {
    res.status(200).send('<h1>Página Inicial</h1>')
})

app.use('/admin', rotasAdmin) // ADMIN 
app.use('/filmes', rotasFilmes) // FILMES

app.use((req, res)=> {
    res.status(404).send('<h1 style="color:red;">Página não encontrada...</h1>');})

// server rodando
app.listen(port, () => {
    console.log(`Server sendo executado em: http://localhost:${port}`);
})