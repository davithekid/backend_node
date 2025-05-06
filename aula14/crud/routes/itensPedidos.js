import Router from "express";
import db from '../db.js'
const router = Router();

router.get('/', async (req, res) => {
    try {
        const itensPedidos = await db.readAll('itens_pedidos')
        res.status(200).send(itensPedidos)
    } catch (err) {
        console.error('Erro ao listar pedidos. ', err)
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const itensPedidos = await db.read('itens_pedidos', `pedido_id = ${Number(id)}`)

        if (!itensPedidos) {
            return res.status(200).send('Erro ao procurar itens_pedidos.')
        }
        return res.send(itensPedidos)

    } catch (err) {
        console.error('Erro ao listar pedido. ', err)
    }
})

router.post('/', async (req, res) => {
    try {
        const itens_pedidos = await db.create('itens_pedidos', req.body);

        return res.send({ message: 'Cliente adicionado com sucesso.', id: itens_pedidos })

    } catch (err) {
        console.error('Erro ao criar pedido.', err)
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const itens_pedidos = await db.update('itens_pedidos', req.body, `pedido_id = ${Number(id)}`);
        if (!itens_pedidos) {
            return res.status(500).send('Erro ao alterar itens_pedidos.')
        }
        return res.send({ message: 'Cliente alterado com sucesso.', id: id })
    } catch (err) {
        console.error('erro', err)
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const itens_pedidos = await db.delete('itens_pedidos',
            `pedido_id = ${Number(id)}`)

        if (!itens_pedidos) {
            return res.status(500).send('Erro ao alterar.')
        }
        return res.send({ message: 'Cliente deletado com sucesso.', id: id })

    } catch (err) {
        console.error(err)
    }
})

export default router   