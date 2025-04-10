import express, { json } from "express";
import db from "./db.js";
const app = express ();
const port = 3000;
const API_URL = `http://localhost:${port}`;
import routerCliente from "./router/routerCliente.js";
import routerProdutos from "./router/routerProdutos.js";
import routerPedidos from './router/routerPedidos.js'


app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('<h1>home</h1>');
});


app.use('/clientes', routerCliente)
app.use('/produtos', routerProdutos)
app.use('/pedidos', routerPedidos)

app.listen(port , () => {
    console.log(`Servidor rodando em ${API_URL}`);
})

// node --watch app.js

