import express from "express";
import livroRoute from './routes/livroRoute.js'

const port = 3000;
const app = express();

app.get('/', (req, res) => {
    res.status(200).send('API de Livros');
});

    app.options('/', (req, res) => {
        res.setHeader('Allow', 'GET, OPTIONS');
        res.status(204).send();
    })

app.use((req, res) => {
    res.status(404).json({message: 'Rota não encontrada'})
})


app.use('/livros', livroRoute )
app.listen(port, () => {
    console.log(`Servidor web rodando em: http://localhost:${port}`)
});