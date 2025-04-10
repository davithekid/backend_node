import db from './conexao.js'


const novoCliente = { nome: 'vv', email: 'gostadepedofilo@gmail.com', endereco: 'Vila Foosha' }

// Proteger nosso bd
db.query('INSERT INTO cliente SET ?', novoCliente, (err, results) => {
    if (err) {
        console.error('Erro ao inserir cliente ao banco de dados: ', err)
    }

    console.log('Dados inseridos com sucesso!!! ID do novo Cliente: ', results.insertId);

    db.end()
}) 