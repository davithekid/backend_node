import express from 'express'
import db from '../db.js'
const router = express.Router();
router.use(express.json());


router.get('/', async (req, res) => {
    try {
        const[rows] = await db.query('SELECT *FROM itens_pedidos');
        res.json(rows);
    } catch (err){
        console.error('Erro ao obter itens pedidos');
        res.status(500).send('Erro ao obter itens pedidos');
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM itens_pedidos WHERE id = ?', [id]);
        if(rows.length > 0){
            res.json(rows[0])
        }else {
            res.status(500).send('Erro ao obter itens pedidos')
        }
    } catch (err){
        console.error(err)
    }
})

router.post('/', async (req, res) => {
    const { pedido_id, produto_id, quantidade, preco_unitario} = req.body;
    try {
        const [result] = await db.query('INSERT INTO itens_pedidos (pedido_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?)', [pedido_id, produto_id, quantidade, preco_unitario]);
        res.status(201).json({id: result.insertId, pedido_id, produto_id, quantidade, preco_unitario});
    } catch (err){
        console.error(err);
        res.status(500).send('Erro ao inserir dados');
    }
})

router.put('/:id', async (req, res) => {
    const  { id }= req.params;
    const {pedido_id, produto_id, quantidade, preco_unitario} = req.body;

    try {
        const [ result ] = await db.query('UPDATE itens_pedidos SET pedido_id = ?, produto_id = ?, quantidade, preco_unitario = ? WHERE id = ?', [pedido_id, produto_id, quantidade, preco_unitario, id])
        if(result.affectedRows > 0){
            res.json({id, pedido_id, produto_id, quantidade, preco_unitario})
        } else {
            res.status(404).send('Item do Pedido não encontrado')
        }
    } catch (err){
        console.error(err)
    }
})

router.delete('/:id', async (req, res) => {
    const { id} = req.params;
    try {
        const [result] = await db.query('DELETE FROM itens_pedidos WHERE id = ?', [id])
        if(result.affectedRows > 0){
            res.json('Item do pedido excluido com sucesso')
        } else {
            res.status(404).send('Erro ao excluir Item pedido')
        }
    } catch (err){
        console.error(err)
    }
})


export default router;
