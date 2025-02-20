const fs = require('fs');// posso usar .promises

fs.promises.readFile('arquivo.txt', 'utf8')
    .then(dataMinuscula => {
        console.log('conteudo do arquivo: ', dataMinuscula);
        return dataMinuscula.toLowerCase();
    })
    
    .then(dataMaiscula => {
        console.log('conteudo do arquivo: ', dataMaiscula);
        return dataMaiscula.toUpperCase();
    })

    .then(data => {
        console.log('conteudo do arquivo: ', data);
    })

    .catch(err => {
        console.error('error ao ler o arquivo', err);
    });

console.log('Esta linha será executada antes da leitura do arquivo!');