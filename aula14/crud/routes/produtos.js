import Router from "express";
import db from '../db.js'
const router = Router();

router.get('/', async (req, res) => {
    try {
        const produtos = await db.readAll('produtos')
        res.status(200).send(produtos)
    } catch (err) {
        console.error('Erro ao acessar produtos. ', err)
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const produtos = await db.read('produtos', `id = ${Number(id)}`)

        if (!produtos) {
            return res.status(200).send('Erro ao procurar produtos.')
        }
        return res.send(produtos)

    } catch (err) {
        console.error('Erro ao acessar produtos. ', err)
    }
})

router.post('/', async (req, res) => {
    try {
        const produtosNovo = await db.create('produtos', req.body);

        return res.send({ message: 'Produto adicionado com sucesso.', id: produtosNovo })

    } catch (err) {
        console.error('Erro ao criar produtos.', err)
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const produtos = await db.update('produtos', req.body, `id = ${Number(id)}`);
        if (!produtos) {
            return res.status(500).send('Erro ao alterar produtos.')
        }
        return res.send({ message: 'Produto alterado com sucesso.', id: id })
    } catch (err) {
        console.error('erro', err)
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const produtos = await db.delete('produtos',
            `id = ${Number(id)}`)

        if (!produtos) {
            return res.status(500).send('Erro ao alterar.')
        }
        return res.send({ message: 'Produto deletado com sucesso.', id: id })

    } catch (err) {
        console.error(err)
    }
})

export default router   