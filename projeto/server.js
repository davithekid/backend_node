import express from "express";
import fs from 'fs';
import axios from "axios";
import  rotasFilmes  from './routers/rotasFilmes.js'
const app = express();
const port = 3000;

app.use(express.json()); // middleware

// rotas get
app.get('/' , (req, res) => {
    res.status(200).send('Home')
})

app.use('/filmes', rotasFilmes)

app.use((req, res)=> {
    res.status(404).send('<h1 style="color:red;">ERROR 404... Produto não encontrada</h1>');
    // res.send('<p style="color:red;">oops... essa página não existe.</p>');
})

// axios.post('http://localhost:3000/filmes', {
//     id: 1,
//     nome: "Superbad",
//     genero: "comédia"
// })



// server rodando
app.listen(port, () => {
    console.log(`Server sendo executado em: http://localhost:${port}`);
})