import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'catalago_de_filmes'
});

connection.connect((err) => {
    if(err){
        console.error('Erro ao conectar banco de dados');
        return;
    }

    console.log('Conexão com o banco de dados estabelecida com sucesso!!');

})

export default connection;