import db from './conexao.js'

const atualizarCliente = { nome: 'Giovanna', email: 'gigi@gmail.com' };

// update cliente    de quem?        cliente 5
db.query('UPDATE Cliente SET ? WHERE id = ? ', [atualizarCliente, 5], (err, results) => {


    if (err) {
        console.error('Erro ao atualizar dados: ', err)
    }

    console.log('Dados do cliente atualizado!! seus novos dados são: ', results.affectedRows);
    db.end();
})