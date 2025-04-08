import db from './conexao.js'

db.query('select * from cliente', (err, results, fields) => {
    if (err) {
        console.error('Erro ao executar a consulta: ', err);
        return;
    }

    console.log('Resultados da consulta: ', results);
    console.log('Campos de consulta: ', fields);
})

db.end((err) => {
    if (err) {
        console.error('Erro ao desrrodar a conexão: ', err);
        return;
    }

    setTimeout(() => {
        console.log('Conexão encerrada com sucesso!!')
    }, 20);



})