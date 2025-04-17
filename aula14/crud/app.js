import express from 'express'
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.status(200).send('Página Inicial')
})

app.get('/clientes', async (req, res) => {
    const clientes = await readAll('clientes')
    res.status(200).json(clientes)
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})