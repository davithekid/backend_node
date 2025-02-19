// importando os módulos
const fs = require('fs');
const readLine = require('readline').createInterface({
 
    input: process.stdin,
    output: process.stdout,
})
 
 
// lendo meu json
fs.readFile('dados.json', 'utf8', (err, data) => {
    if (err) {
        console.log('Erro na leitura do json', err);
        return;
    }
 
    const dados = JSON.parse(data);
    try {
        console.log(`user: ${dados.user} \nemail: ${dados.email} \nsenha: ${dados.senha}`);
    } catch (error) {
        console.error('Erro ao parsear o JSON', error);
    }
 
    // pergunta
    readLine.question('\nDeseja alterar algo? ', pergunta => {
 
        if (pergunta == "sim" || pergunta == "s") {
 
            readLine.question('O que deseja alterar? ', resposta => {
 
                // bloco altera user
                if (resposta == "user") {
 
                    readLine.question('Insira: ', respostaUser => {
                        dados.user = respostaUser;
 
                        const jsonData = JSON.stringify(dados, null, 2);
                        fs.writeFile('dados.json', jsonData, err => {
                            if (err) throw err;
                            console.log('\nUser alterado com sucesso!!');
                        });
                    })
 
                }
 
                // bloco altera email
                if (resposta == "email") {
 
                    readLine.question('Insira: ', respostaEmail => {
                        dados.email = respostaEmail;
 
                        const jsonData = JSON.stringify(dados, null, 2);
                        fs.writeFile('dados.json', jsonData, err => {
                            if (err) throw err;
                            console.log('\nE-mail alterado com sucesso!!');
                        });
                    })
                }
 
                // bloco altera senha
                if (resposta == "senha") {
 
                    readLine.question('Insira: ', respostaSenha => {
                        dados.senha = respostaSenha;
 
                        const jsonData = JSON.stringify(dados, null, 2);
                        fs.writeFile('dados.json', jsonData, err => {
                            if (err) throw err;
                            console.log('\nSenha alterada com sucesso!!');
                        });
                    })
                }
 
 
            })
 
        } else {
            console.log('\nFim de execução do programa.')
        }
 
    })
 
})
 
 
 
 
 
 