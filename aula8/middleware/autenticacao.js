const express = require('express');
const app = express();
const port = 3000;

const autenticar = (req, res, next) => {
    // simulação de autenticação: NUNCA usar em produção!!!
    const token = req.headers['authorization'];
    if (token === 'SEGREDO') {
        next(); // autenticado
    } else {
        res.status(401).send('Não autorizado!!!')
    }
};

app.get('/admin', autenticar, (req, res) => {
    res.status(200).send('<h1>Painel de administração</h1>');
})

app.get('/', (req, res) => {
    res.status(200).send('<h1>HOME</h1>');
});

app.listen(port, () => {
    console.log(`Servidor sendo executado em: http://localhost:${port}`)
});




