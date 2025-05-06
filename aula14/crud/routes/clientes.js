import Router from "express";
import db from '../db.js'
const router = Router();

router.get('/', async (req, res) => {
    try {
        const clientes = await db.readAll('cliente')
        res.status(200).send(clientes)
    } catch (err) {
        console.error('Erro ao acessar cliente. ', err)
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const clientes = await db.read('cliente', `id = ${Number(id)}`)

        if (!clientes) {
            return res.status(200).send('Erro ao procurar cliente.')
        }
        return res.send(clientes)

    } catch (err) {
        console.error('Erro ao acessar cliente. ', err)
    }
})

router.post('/', async (req, res) => {
    try {
        const cliente = await db.create('cliente', req.body);

        return res.send({ message: 'Cliente adicionado com sucesso.', id: cliente })

    } catch (err) {
        console.error('Erro ao criar cliente.', err)
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await db.update('cliente', req.body, `id = ${Number(id)}`);
        if (!cliente) {
            return res.status(500).send('Erro ao alterar cliente.')
        }
        return res.send({ message: 'Cliente alterado com sucesso.', id: id })
    } catch (err) {
        console.error('erro', err)
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await db.delete('cliente',
            `id = ${Number(id)}`)

        if (!cliente) {
            return res.status(500).send('Erro ao alterar.')
        }
        return res.send({ message: 'Cliente deletado com sucesso.', id: id })

    } catch (err) {
        console.error(err)
    }
})

export default router   