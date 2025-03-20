import express from "express";
import fs from 'fs'
const router = express.Router();

let filmes = [];
try {
    const data = fs.readFileSync('filmes.json', 'utf8');
    filmes = JSON.parse(data);
} catch (error) {
    console.error('erro ao ler o arquivo produtos.json', error);
    filmes = [];
}

router.get('/', (req, res) => {
    res.status(200).send('Página inicial (FILMES)');
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const filme = filmes.find(f => f.id === id)

    if (filme) {
        res.send(filme)
    } else {
        res.status(404).send('<h1 style="color:red;">ERROR 404... Página não encontrada</h1>');
    }
})

// router.post('/', (req, res) => {
//     const novoFilme = req.body;
//     console.log('Novo Filme adicionado: ', novoFilme);
//     res.status(200).send('Filme adicionado com sucesso!!')
// })

// router.options('/:id', (req, res) => {
//     res.header('Allow', 'POST');
//     res.status(204).send(novoFilme);
// })

export default router;