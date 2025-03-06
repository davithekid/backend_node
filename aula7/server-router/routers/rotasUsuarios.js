const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('Pagina usuarios');
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Detalhes do usuário com ID: ${id}`);
})

router.post('/', (req, res) => {
    const novoProduto = req.body;
    console.log('Novo produto: ', novoProduto);
    res.status(200).send(`Usuario criado com sucesso!!!`)
})

router.options('/:id', (req, res) =>{
    res.header('Allow' , 'POST');
    res.status(204).send();
})

module.exports = router;    