const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('<h1 style="color: green">Produtos</h1>');
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Detalhes do produto com ID: ${id}`);
})

router.post('/', (req, res) => {
    const novoProduto = req.body;
    console.log('Novo produto: ', novoProduto)
    res.status(200).send(`Produto criado com sucesso!!!`)
})

router.options('/:id' , (req, res)=>{
    res.header('Allow', 'POST');
    res.status(204).send()
})
module.exports = router;
