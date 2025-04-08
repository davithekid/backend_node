import db from './conexao.js'


const novoCliente = { nome: 'Luffy', email: 'luffy@gmail.com', endereco: 'Vila Foosha' }

db.query('INSERT INTO cliente SET ?', novoCliente, (err, results) => {
    if (err) {
        console.error('Erro ao inserir cliente ao banco de dados: ', err)
    }

    console.log('Dados inseridos com sucesso!!! ID do novo Cliente: ', results.insertId);

    db.end()
}) // Proteger nosso bd