const fs = require("fs");

const dados = {

    nome: 'Davi',
    idade: 19,
    endereco: {
        rua: 'rua juquia',
        cidade: 'santo andré',
    },
    telefone: [
        '11-946522127',
        '11-946522127',
    ],
}

const jsonData = JSON.stringify(dados, null, 2);

fs.writeFile('dados2.json', jsonData,  'utf8', (err) => {
    if (err) {
        console.log('erro na escrita do arquivo: ', err);
        return;
    }
    console.log('dados gravados com sucesso!!!')
});