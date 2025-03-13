const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// export rotas
const rotasUsuarios = require('./routers/rotasUsuarios')
const rotasProdutos = require('./routers/rotasProdutos')
const rotasAdmin = require('./routers/rotasAdmin');

// dados de logger (horario)
const logger = (req, res, next) => {
    const data = new Date();
    console.log(`${data.toISOString()} ${req.method} ${req.url}`)
    next();

    const newLine = `${data.toISOString()} ${req.method} ${req.url}`;
    fs.appendFile('arquivo.txt', newLine, err => {
        if (err) throw err;
        console.log('arquivo salvo')
    })
    
}


app.use(logger); 

// rota inicial 
app.get('/', (req, res) => {
    res.status(200).send('<h1>Página Principal</h1>')
})

// definindo rotas
app.use('/admin', rotasAdmin);
app.use('/usuarios', rotasUsuarios);
app.use('/produtos', rotasProdutos);
app.use((req, res)=> {
    res.status(404).send('<p style="color:red;">erro 404 not found</p>');
})


app.listen(port, () => {
    console.log(`Servido sendo executado em: http://localhost:${port}`);
})