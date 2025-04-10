import express from "express";
import db from "../db.js";
const router = express.Router();
router.use(express.json());



router.get('/', async (req, res) => {
    try {
        const[rows] = await db.query('SELECT *FROM cliente');
        res.json(rows);
    } catch (err){
        console.error('Erro ao obter clientes');
        res.status(500).send('Erro ao obter clientes');
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM cliente WHERE id = ?', [id]);
        if(rows.length > 0){
            res.json(rows[0])
        }else {
            res.status(500).send('Erro ao obter cliente')
        }
    } catch (err){
        console.error(err)
    }
})

router.post('/', async (req, res) => {
    const { nome, email, endereco} = req.body;
    try {
        const [result] = await db.query('INSERT INTO cliente (nome, email, endereco) VALUES (?, ?, ?)', [nome, email, endereco]);
        res.status(201).json({id: result.insertId, nome, email, endereco});
    } catch (err){
        console.error(err);
        res.status(500).send('Erro ao inserir dados');
    }
})

router.put('/:id', async (req, res) => {
    const  { id }= req.params;
    const {nome, email, endereco} = req.body;

    try {
        const [ result ] = await db.query('UPDATE cliente SET nome = ?, email = ?, endereco = ? WHERE id = ?', [nome, email, endereco, id])
        if(result.affectedRows > 0){
            res.json({id, nome, email, endereco})
        } else {
            res.status(404).send('Cliente não encontrado')
        }
    } catch (err){
        console.error(err)
    }
})

router.delete('/:id', async (req, res) => {
    const { id} = req.params;
    try {
        const [result] = await db.query('DELETE FROM cliente WHERE id = ?', [id])
        if(result.affectedRows > 0){
            res.json('Cliente excluido com sucesso')
        } else {
            res.status(404).send('Erro ao excluir cliente')
        }
    } catch (err){
        console.error(err)
    }
})


export default router;