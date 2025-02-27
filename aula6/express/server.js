const express = require('express'); // import express
const app = express(); // aplicação recebe express
const port = 3000; // porta server

const produtos = [
    {id: 1, nome: "Rainbow six siege", preço: 80},
    {id: 2, nome: "Valorant", preço: 0},
    {id: 3, nome: "CS-GO", preço: 0}
]

// /url 
app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

// /produtos
app.get('/produtos', (req, res) => {
res.send(produtos);
});

// separando produtos por id
app.get('/produtos/:id', (req, res)=> {
    const id = parseInt(req.params.id); // req. parametro. id
    const produto = produtos.find(p => p.id === id);
  
    if(produto){
       res.send(produto)

    } else {
      res.status(404).send('voce é burro?')
    }
})

app.use((req, res)=> {
        res.status(404).send('<p style="color:red;">Error</p>');
})


app.listen(port, () => {
    console.log(`Server operando em http://localhost${port}`);
});