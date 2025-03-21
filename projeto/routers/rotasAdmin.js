import express from "express";
const router = express.Router()

// autenticação

const autenticar = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token === 'davi123'){
        next(); // autenticado
    } else {
        res.status(401).send('<h1 style="color: red;">Não autorizado</h1>') // não autorizado
    }
}

router.get('/', autenticar, (req, res) => {
    res.status(200).send('<h1>Painel ADM</h1>');
})

export default router;