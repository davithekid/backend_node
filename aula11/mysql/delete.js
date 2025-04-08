import db from './conexao.js'

db.query('DELETE FROM cliente where id = ?', 2, (err, results) => {
    if (err) {
        console.error('Erro ao excluir dados: ', err)
        return;
    }

    setTimeout(() => {
        console.log('Dados excluidos com sucesso!! Linhas afetadas: ', results.affectedRows);
    }, 20);

    db.end()
})