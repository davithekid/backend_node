const express = require('express'); 
const app = express(); 
const port = 3000; 
 
app.use(express.json()) // para json
app.use(express.urlencoded({extended:true})) // para forms

app.get('/', (req, res) => {
    res.send('<h1>Hello World!!!</h1>');
});

app.get('/usuarios/:id', (req,res) => {
    const id = parseInt(req.params.id);
    res.send(`Detalhes do usuário com o ID: ${id}`);
})

app.get('/categorias/:categoria/produtos/:produto' , (req, res) => {
    const categoria = req.params.categoria;
    const produto = req.params.produto;
    res.send(`Detalhes da categoria: ${categoria} ${produto}`);
})

app.post('/produtos', (req, res) => {
    const novoProduto = req.body;
    console.log('Novo produto: ', novoProduto);
    res.status(201).send(`Produto criado com sucesso!!!`)
    res.json(novoProduto)

})

app.options('/produtos', (req, res) => {
    res.header('Allow', 'POST');
    res.status(204).send()
})

app.listen(port, () => {
    console.log(`Server operando em http://localhost${port}`);
});