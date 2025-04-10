import express from "express";
import db from "../db.js";
const router = express.Router();
router.use(express.json());



router.get('/', async (req, res) => {
    try {
        const[rows] = await db.query('SELECT *FROM produtos');
        res.json(rows);
    } catch (err){
        console.error('Erro ao obter produtos');
        res.status(500).send('Erro ao obter produtos');
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM produtos WHERE id = ?', [id]);
        if(rows.length > 0){
            res.json(rows[0])
        }else {
            res.status(500).send('Erro ao obter produtos')
        }
    } catch (err){
        console.error(err)
    }
})

router.post('/', async (req, res) => {
    const { nome, descricao, preco} = req.body;
    try {
        const [result] = await db.query('INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)', [nome, descricao, preco]);
        res.status(201).json({id: result.insertId, nome, descricao, preco});
    } catch (err){
        console.error(err);
        res.status(500).send('Erro ao inserir dados');
    }
})

router.put('/:id', async (req, res) => {
    const  { id }= req.params;
    const {nome, descricao, preco} = req.body;

    try {
        const [ result ] = await db.query('UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?', [nome, descricao, preco, id])
        if(result.affectedRows > 0){
            res.json({id, nome, descricao, preco})
        } else {
            res.status(404).send('Produto não encontrado')
        }
    } catch (err){
        console.error(err)
    }
})

router.delete('/:id', async (req, res) => {
    const { id} = req.params;
    try {
        const [result] = await db.query('DELETE FROM produtos WHERE id = ?', [id])
        if(result.affectedRows > 0){
            res.json('Produto excluido com sucesso')
        } else {
            res.status(404).send('Erro ao excluir produtos')
        }
    } catch (err){
        console.error(err)
    }
})


export default router;