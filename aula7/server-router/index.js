const express = require('express');
const app = express();
const port = 3000;
const rotasUsuarios = require('./routers/rotasUsuarios');
const rotasProdutos = require('./routers/rotasProdutos');


app.use(express.json());
// app.use(express.urlencoded());

app.get('/',  (req, res) => {
    res.status(200).send('<h1>Página Inicial</h1>');
});

app.use('/usuarios', rotasUsuarios);
app.use('/produtos', rotasProdutos);



app.listen(port, () => {
    console.log('Server executando em http://localhost:3000');
});