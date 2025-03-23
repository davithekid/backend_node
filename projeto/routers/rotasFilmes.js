import express from "express";
import fs from 'fs'
import axios from "axios";
const router = express.Router();

let filmes = [];
try {
    const data = fs.readFileSync('filmes.json', 'utf8');
    filmes = JSON.parse(data);
} catch (error) {
    console.error('erro ao ler o arquivo produtos.json', error);
    filmes = [];
}

// rota inicial /filmes
router.get('/', (req, res) => {
    // res.status(200).send('Página inicial (FILMES)');
    res.status(200).send(filmes)
})

// get
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const filme = filmes.find(f => f.id === id)

    if (filme) {
        res.send(filme)
    } else {
        res.status(404).send('<h1 style="color:red;">ERROR 404... Produto não encontrado</h1>');
    }
})

router.post('/', (req, res) => {
    const novoFilme = req.body;
    console.log('Novo filme adicionado: ', novoFilme);
    res.status(200).send('Filme adicionado ao catálogo com sucesso!!!')
})
// patch
router.patch('/:id', (req, res) => {
    const alterado = req.body;
    console.log('Filme alterado com sucesso: ', alterado);
    res.status(200).send('Filme alterado no catálogo com sucesso!!!')
})

// delete
router.delete('/:id', (req, res) => {
    const deletado = req.body;
    console.log('Filme deletado com sucesso: ', deletado);
    res.status(200).send('Filme deletado no catálogo com sucesso!!!')
})


export default router;