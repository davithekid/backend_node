import express from 'express';
import db from '../models/db.js';
const router = express.Router();
router.use(express.json());

// listando todo o catálogo em /filmes
router.get('/', async (req, res) => {
    try {
        const[rows] = await db.query('SELECT *FROM catalago');
        res.json(rows);
    } catch (err){
        console.error('Erro ao obter filmes.');
        res.status(500).send('Erro ao obter filmes.')
    }
});

// listando o catálogo por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const[rows] = await db.query('SELECT *FROM catalago WHERE id = ?', [id]);

        // se filme "existe"...
        if(rows.length > 0){
            res.json(rows[0])
        } else {
            res.status(500).send('<h1>Erro ao obter filme.</h1>');
        }
    }  catch (err){
        console.error(err);
    }
})

// rota post
router.post('/', async (req,res) => {
    // passando os parametros do db
    const { nome, genero} = req.body;
    try {                                               // post nome & genero
        const [result] = await db.query('INSERT INTO catalago (nome, genero) VALUES (?, ?)', [nome, genero]);
                        // id auto incrementa
        res.status(201).json({id: result.insertId, nome, genero});
        } catch (err){
            console.error(err)
            res.status(500).send('Erro ao inserir dados.')
        }
    })

    // rota put (atualizar)
router.put('/:id', async (req,res) => {
    const { id } = req.params;
    const {nome, genero} = req.body;

    try{
        const [ result ] = await db.query('UPDATE catalago SET nome = ?, genero = ? WHERE id = ?', [nome, genero, id])
        if(result.affectedRows > 0){
            // atualizando o filme
            res.json({id, nome, genero})
        } else {
            res.status(404).send('Filme não encontrado.')
        }
    } catch (err){
        console.error(err)
    }

})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const [result] = await db.query('DELETE FROM catalago WHERE id = ?', [id])
        if(result.affectedRows > 0){
            res.json('Filme excluído com sucesso.')
        } else {
            res.status(404).send('Filme não encontrado')
        }
    } catch (err){
        console.error(err)
    }
})

export default router