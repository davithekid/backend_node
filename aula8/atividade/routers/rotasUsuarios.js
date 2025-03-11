const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('<h1 style="color: aqua";>Usuários</h1>');
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Detalhes do usuário com ID: ${id}`);
})

router.post('/', (req, res) => {
    const novoUsuario = req.body;
    console.log('Novo Usuário: ', novoUsuario);
    res.status(200).send(`Usuário criado com sucesso!!!`)
})

router.options('/:id', (req, res) =>{
    res.header('Allow' , 'POST');
    res.status(204).send();
})

module.exports = router;    