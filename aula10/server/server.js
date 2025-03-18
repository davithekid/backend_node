import express from 'express';
import fs from 'fs';
const app = express();
const port = 3000;

let produtos = [];
try {
    const data = fs.readFileSync('produtos.json', 'utf8',);
    produtos = JSON.parse(data);
} catch (error){
    console.error('Erro ao ler o arquivo produtos.json', error);
    produtos = []
}

app.get('/produtos', (req, res) => {
    res.json(produtos);
});

app.get('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    const produto = produtos.find(p => p.id === id);

    if(produto) {
        res.json(produto);
    } else {
        res.status(404).send('Produto não encontrado!!!');
    }
});

app.get('/', (req, res) => {
    res.send('<h1>Home</h1>')
});

app.listen(port , () => {
    console.log(`Servidor rodando em: http://localhost:${port}`);
});