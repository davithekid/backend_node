const fs = require('fs');
const { json } = require('stream/consumers');

fs.readFile('dados.json', 'utf8', (err, data) => {

    if (err) {
        console.log('erro na leitura do json', json);
        return;
    }

    const dados = JSON.parse(data)

    try {

        dados.produtos.forEach(produto => {
            console.log(`\nNome: ${produto.nome}\nPreço: ${produto.preco}\n Descrição ${produto.descricao}\n ${produto.categoria}`);
        })



    } catch (error) {
        console.log('erro ao parsear', error);
    }




})