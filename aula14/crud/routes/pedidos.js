import Router from "express";
import db from '../db.js'
const router = Router();

router.get('/', async (req, res) => {
    try {
        const pedidos = await db.readAll('pedidos')
        res.status(200).send(pedidos)
    } catch (err) {
        console.error('Erro ao acessar pedidos. ', err)
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pedidos = await db.read('pedidos', `id = ${Number(id)}`)

        if (!pedidos) {
            return res.status(200).send('Erro ao procurar pedidos.')
        }
        return res.send(pedidos)

    } catch (err) {
        console.error('Erro ao acessar pedidos. ', err)
    }
})

router.post('/', async (req, res) => {
    try {
        const pedidosNovo = await db.create('pedidos', req.body);

        return res.send({ message: 'Pedido adicionado com sucesso.', id: pedidosNovo })

    } catch (err) {
        console.error('Erro ao criar pedidos.', err)
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const pedidos = await db.update('pedidos', req.body, `id = ${Number(id)}`);
        if (!pedidos) {
            return res.status(500).send('Erro ao alterar pedidos.')
        }
        return res.send({ message: 'Pedido alterado com sucesso.', id: id })
    } catch (err) {
        console.error('erro', err)
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const pedidos = await db.delete('pedidos',
            `id = ${Number(id)}`)

        if (!pedidos) {
            return res.status(500).send('Erro ao alterar.')
        }
        return res.send({ message: 'Pedido deletado com sucesso.', id: id })

    } catch (err) {
        console.error(err)
    }
})

export default router   