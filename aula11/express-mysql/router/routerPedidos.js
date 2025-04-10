import express from 'express'
import db from '../db.js'
const router = express.Router();
router.use(express.json());


router.get('/', async (req, res) => {
    try {
        const[rows] = await db.query('SELECT *FROM pedidos');
        res.json(rows);
    } catch (err){
        console.error('Erro ao obter pedidos');
        res.status(500).send('Erro ao obter pedidos');
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM pedidos WHERE id = ?', [id]);
        if(rows.length > 0){
            res.json(rows[0])
        }else {
            res.status(500).send('Erro ao obter pedidos')
        }
    } catch (err){
        console.error(err)
    }
})

router.post('/', async (req, res) => {
    const { cliente_id, periodo, total} = req.body;
    try {
        const [result] = await db.query('INSERT INTO pedidos (cliente_id, periodo, total) VALUES (?, ?, ?)', [cliente_id, periodo, total]);
        res.status(201).json({id: result.insertId, cliente_id, periodo, total});
    } catch (err){
        console.error(err);
        res.status(500).send('Erro ao inserir dados');
    }
})

router.put('/:id', async (req, res) => {
    const  { id }= req.params;
    const {cliente_id, periodo, total} = req.body;

    try {
        const [ result ] = await db.query('UPDATE pedidos SET cliente_id = ?, periodo = ?, total = ? WHERE id = ?', [cliente_id, periodo, total, id])
        if(result.affectedRows > 0){
            res.json({id, cliente_id, periodo, total})
        } else {
            res.status(404).send('Pedido não encontrado')
        }
    } catch (err){
        console.error(err)
    }
})

router.delete('/:id', async (req, res) => {
    const { id} = req.params;
    try {
        const [result] = await db.query('DELETE FROM pedidos WHERE id = ?', [id])
        if(result.affectedRows > 0){
            res.json('Cliente excluido com sucesso')
        } else {
            res.status(404).send('Erro ao excluir pedidos')
        }
    } catch (err){
        console.error(err)
    }
})


export default router;
