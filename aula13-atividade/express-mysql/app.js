import express from 'express';
import db from './models/db.js';
const app = express();
const port = 3000;
const API_URL = `http:localhost:${port}`;
import rotaFilmes from './routers/rotaFilmes.js'
import rotaAdmin from './routers/rotaAdmin.js'

app.use(express.json()); // middleware

const logger = (req, res, next) => {
    const data = new Date();
    console.log(`${data.toLocaleString()} METODO: ${req.method}, ACESSANDO: ${req.url}`);
    next();
}

app.use(logger)

app.get('/', (req, res) => {
    res.status(200).send('<h1>Página Inicial</h1>');
});

app.use('/filmes', rotaFilmes);
app.use('/admin', rotaAdmin);

app.listen(port, () => {
    console.log(`Servidor rodando em: ${API_URL}`);
})