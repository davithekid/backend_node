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
        console.log(dados);
    } catch (error) {
        console.error('Erro ao parsear o JSON', error);
    }


    // adiciona
    readLine.question('Deseja adicinar algo? (S/N) ', perguntaAdd => {

        if (perguntaAdd == 'sim' || perguntaAdd == 's') {

            readLine.question('\nInsira a chave: ', chave => {
                readLine.question('insira o valor: ', valor => {

                    dados[chave] = valor;
                    const jsonData = JSON.stringify(dados, null, 2);

                    fs.writeFile('dados.json', jsonData, err => {

                        if (err) throw err;
                        console.log('\nDados adicionados com sucesso!!')
                        readLine.close();
                    })
                })
            })
        } else {

            // alterar
            readLine.question('\nDeseja alterar algo? (S/N) \n', pergunta => {

                if (pergunta == "sim" || pergunta == "s") {

                    readLine.question('O que deseja alterar? (user/email/senha/dadoAdd)  ', resposta => {

                        // bloco altera user
                        if (resposta == "user") {

                            readLine.question('Insira: ', respostaUser => {
                                dados.user = respostaUser;

                                const jsonData = JSON.stringify(dados, null, 2);
                                fs.writeFile('dados.json', jsonData, err => {
                                    if (err) throw err;
                                    console.log('\nUser alterado com sucesso!!');
                                    readLine.close();

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
                                    readLine.close();
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
                                    readLine.close()

                                });
                            })
                        }

                        // bloco altera dado novo
                        if (resposta == "dadoAdd") {
                            readLine.question('Insira: ', valorNovo => {
                                dados.rua = valorNovo;

                                const jsonData = JSON.stringify(dados, null, 2);
                                fs.writeFile('dados.json', jsonData, err => {
                                    if (err) throw err;
                                    console.log('\nSenha alterada com sucesso!!');
                                    readLine.close()

                                });
                            })
                        }
                    })

                } else {
                    console.log('\nFim de execução do programa.')
                    readLine.close()

                }
            })
        }
    })
})