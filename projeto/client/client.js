import chalk from "chalk";
import axios from "axios";
import inquirer from 'inquirer'
import fs from 'fs'
import { generateKey } from "crypto";
import { assert } from "console";
import { url } from "inspector";
const API_URL = 'http://localhost:3000';

// lendo meu arquivo json
fs.readFile('../filmes.json', 'utf8', (err, data) => {
    if (err) {
        console.log(chalk.red('Erro na leitura do json'), err);
        return;
    }

    // dados recebe meu json
    const dados = JSON.parse(data);

    // criando as funções
    async function listarFilmes() {
        try {
            const response = await axios.get(`${API_URL}/filmes`)
            return response.data;
        } catch (error) {
            console.error(chalk.red('erro ao listar o catálogo: '), error.message);
            return [];
        }

    }

    async function exibirDetalhesCatálogo(id) {
        try {
            const response = await axios.get(`${API_URL}/filmes/${id}`)
            return response.data;
        } catch (error) {
            console.error(chalk.red(`Erro ao exibir o filme com o id: ${id}`), error.message)
            return null
        }
    }

    async function exibirMenu() {
        console.log('\n');
        const perguntas = [
            {
                type: "list",
                name: "opcao",
                message: chalk.yellow('Escolha uma opção: '),
                choices: [
                    { name: chalk.cyanBright('Exibir Catálogo'), value: 'listar' },
                    { name: chalk.cyanBright('Exibir detalhes do filme'), value: 'exibir' },
                    { name: chalk.magentaBright.bold('Modo Administrado'), value: 'admin' },
                    { name: chalk.cyanBright('Sair da operação'), value: 'sair' }
                ]
            }
        ];

        async function exibirMenuADM() {
            console.log('\n');
            const menuADM = [
                {
                    type: "list",
                    name: "opcaoADM",
                    message: chalk.yellow('Escolha uma opção: '),
                    choices: [
                        { name: chalk.cyanBright('Exibir Catálogo'), value: 'listar' },
                        { name: chalk.cyanBright('Exibir detalhes do filme'), value: 'exibir' },
                        { name: chalk.cyanBright('Adicionar um filme'), value: 'adicionar' },
                        { name: chalk.cyanBright('Atualizar um filme'), value: 'atualizar' },
                        { name: chalk.cyanBright('Deletar um filme'), value: 'deletar' },
                        { name: chalk.cyanBright('Sair da operação'), value: 'sair' }
                    ]
                }
            ];


            try {
                const resposta = await inquirer.prompt(perguntas)

                switch (resposta.opcao) {
                    case 'listar':
                        const filmes = await listarFilmes();

                        if (Array.isArray(filmes) && filmes.length > 0) {
                            console.log(chalk.green('Catálogo'))

                            filmes.forEach(filme => {
                                console.log(`${chalk.cyan(filme.id)}: ${chalk.blueBright(filme.nome)} , ${chalk.yellow(filme.genero)}`)
                            })
                        } else {
                            console.log(chalk.yellow('Nenhum filme encontrado.'))
                        }

                        exibirMenu();
                        break;

                    case 'admin':
                        const admin = await inquirer.prompt([
                            { message: 'Digite a senha: ', type: 'password', name: 'senha' }
                        ])

                        if (admin.senha === 'SEGREDO') {

                            const respostaADM = await inquirer.prompt(menuADM)

                            switch (respostaADM.opcaoADM) {

                                case 'listar':
                                    const filmes = await listarFilmes();
            
                                    if (Array.isArray(filmes) && filmes.length > 0) {
                                        console.log(chalk.green('Catálogo'))
            
                                        filmes.forEach(filme => {
                                            console.log(`${chalk.cyan(filme.id)}: ${chalk.blueBright(filme.nome)} , ${chalk.yellow(filme.genero)}`)
                                        })
                                    } else {
                                        console.log(chalk.yellow('Nenhum filme encontrado.'))
                                    }
            
                                    exibirMenu();
                                    break;

                                case 'adicionar':

                                    const filmeNovo = await inquirer.prompt([
                                        {
                                            message: "Digite o ID do filme: ",
                                            type: "number",
                                            name: "id",
                                            default: 0
                                        },
                                        {
                                            message: "Digite o nome do filme: ",
                                            type: "input",
                                            name: "nome",
                                        },
                                        {
                                            message: "Digite o genero do filme: ",
                                            type: "input",
                                            name: "genero"

                                        },

                                    ]);

                                    try {

                                        filmeNovo.id = parseInt(filmeNovo.id)

                                        if (filmeNovo.id == dados.id) {
                                            console.log(chalk.red('Esse ID ja existe.'))
                                        } else {

                                            dados.push(dados.id = filmeNovo)

                                            const jsonData = JSON.stringify(dados, null, 2)

                                            console.log(chalk.green('Filme adicionado com sucesso!!'));
                                            fs.writeFileSync('../filmes.json', jsonData, err => {
                                                if (err) throw err;
                                            })

                                            axios.post('http://localhost:3000/filmes/', {
                                                id: filmeNovo.id,
                                                nome: filmeNovo.nome,
                                                genero: filmeNovo.genero
                                            })
                                        }

                                    } catch (error) {
                                        console.error(chalk.red(error))
                                    }
                                    exibirMenu();
                                    break;
                                case 'atualizar':
                                    const filmeAtualizado = await inquirer.prompt([
                                        {
                                            message: "Digite o ID do filme: ",
                                            type: "number",
                                            name: "id",
                                        },
                                        {
                                            message: "Digite o novo nome do filme: ",
                                            type: "input",
                                            name: "nome",
                                        },
                                        {
                                            message: "Digite o genero do filme: ",
                                            type: "input",
                                            name: "genero"

                                        },

                                    ]);

                                    try {
                                        filmeAtualizado.id = parseInt(filmeAtualizado.id)

                                        if (filmeAtualizado.id == 0 || filmeAtualizado.id != dados.id) {
                                            console.log(chalk.red('ID inexistente'))
                                        } else {

                                            dados[filmeAtualizado.id - 1] = filmeAtualizado
                                            const jsonData = JSON.stringify(dados, null, 2)

                                            console.log(chalk.green.bold('Filme atualizado com sucesso!!'));
                                            fs.writeFileSync('../filmes.json', jsonData, err => {
                                                if (err) throw err;
                                            })

                                            axios.patch(`http://localhost:3000/filmes/${dados}`, {
                                                id: filmeAtualizado.id,
                                                nome: filmeAtualizado.nome,
                                                genero: filmeAtualizado.genero

                                            })
                                        }
                                    } catch (error) {
                                        console.error(chalk.red(error))
                                    }
                                    exibirMenu();
                                    break;

                                case 'deletar':
                                    const deletarFilme = await inquirer.prompt([
                                        {
                                            message: "Digite o ID do filme: ",
                                            type: "number",
                                            name: "id",
                                        },

                                    ]);

                                    try {

                                        if (filmeAtualizado.id <= 0) {
                                            console.log(chalk.red('ID inexistente'))
                                        } else {

                                            deletarFilme.id = parseInt(deletarFilme.id)
                                            dados.splice(dados.id = deletarFilme.id - 1, 1)
                                            const jsonData = JSON.stringify(dados, null, 2)

                                            console.log(chalk.green('Filme deletado com sucesso!!'));
                                            fs.writeFileSync('../filmes.json', jsonData, err => {
                                                if (err) throw err;
                                            })

                                            axios.delete(`http://localhost:3000/filmes/${dados.id}`)

                                        }
                                    } catch (error) {
                                        console.error(chalk.red(error))
                                    }
                                    exibirMenu();
                                    break;

                                    case 'exibir':
                        const idReposta = await inquirer.prompt([
                            {
                                type: "input",
                                name: "id",
                                message: chalk.blue('Digite o ID do filme: ')
                            }
                        ]);

                        const filme = await exibirDetalhesCatálogo(idReposta.id);
                        if (filme) {
                            console.log(`${chalk.cyan(filme.id)}: ${chalk.blueBright(filme.nome)} ${chalk.yellow(filme.genero)}`)
                        } else {
                            console.log(chalk.yellow('Filme não encontrado'))
                        }
                        exibirMenu();
                        break;

                    case 'sair':
                        console.log(chalk.yellow('Saindo do sistema...'))
                        break;
                            }

                        } else {
                            console.log(chalk.red('Senha Incorreta.'))
                        }
                        break;
                    case 'exibir':
                        const idReposta = await inquirer.prompt([
                            {
                                type: "input",
                                name: "id",
                                message: chalk.blue('Digite o ID do filme: ')
                            }
                        ]);

                        const filme = await exibirDetalhesCatálogo(idReposta.id);
                        if (filme) {
                            console.log(`${chalk.cyan(filme.id)}: ${chalk.blueBright(filme.nome)} ${chalk.yellow(filme.genero)}`)
                        } else {
                            console.log(chalk.yellow('Filme não encontrado'))
                        }
                        exibirMenu();
                        break;

                    case 'sair':
                        console.log(chalk.yellow('Saindo do sistema...'))
                        break;
                }
            } catch (error) {
                console.error('erro', error)
            }
        }
        exibirMenuADM();
    };
    exibirMenu();
});