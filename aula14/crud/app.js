import express from 'express'
import routeCliente from './routes/clientes.js'
import routeProduto from './routes/produtos.js'
import routePedido from './routes/pedidos.js'
import routeItensPedidos from './routes/itensPedidos.js'
const app = express();
const port = 3000;
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('Página Inicial')
})

app.use('/clientes',routeCliente)
app.use('/produtos',routeProduto)
app.use('/pedidos',routePedido)
app.use('/itensPedidos',routeItensPedidos)

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})