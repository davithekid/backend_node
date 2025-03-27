import chalk from "chalk";
import axios from "axios";
import inquirer from 'inquirer'
import fs from 'fs'
import { generateKey } from "crypto";
import { assert } from "console";
const API_URL = 'http://localhost:3000';


fs.readFile('../filmes.json', 'utf8', (err, data) => {
    if (err) {
        console.log(chalk.red('Erro na leitura do json'), err);
        return;
    }

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
            console.error(chalk.red(`erro ao exibir filmes com id: ${id}`), error.message)
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
                    { name: chalk.green('Exibir Catálogo'), value: 'listar' },
                    { name: chalk.green('Exibir detalhes do filme'), value: 'exibir' },
                    { name: chalk.green('Adicionar um filme'), value: 'adicionar' },
                    { name: chalk.green('Atualizar um filme'), value: 'atualizar' },
                    { name: chalk.redBright('Deletar um filme'), value: 'deletar' },
                    { name: chalk.green('Sair da operação'), value: 'sair' }
                ]
            }

        ]

        try {
            const resposta = await inquirer.prompt(perguntas)

            switch (resposta.opcao) {
                case 'listar':
                    const filmes = await listarFilmes();

                    if (Array.isArray(filmes) && filmes.length > 0) {
                        console.log(chalk.green('Lista de Filme'))

                        filmes.forEach(filme => {
                            console.log(`${chalk.cyan(filme.id)}: ${chalk.blueBright(filme.nome)} - ${chalk.yellow(filme.genero)}`)
                        })
                    } else {
                        console.log(chalk.yellow('nenhum filme encontrado'))
                    }

                    exibirMenu();
                    break;

                case 'adicionar':

                    const filmeNovo = await inquirer.prompt([
                        {
                            message: "Digite o ID do filme: ",
                            type: "input",
                            name: "id",
                            default: "10"
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
                        dados.push(dados.id = filmeNovo)
                        
                        const jsonData = JSON.stringify(dados, null, 2)
                        
                        console.log(chalk.green('Filme adicionado com sucesso!!'));
                        fs.writeFileSync('../filmes.json', jsonData, err=> {
                            if (err) throw err;
                        })
                        

                    } catch (error) {
                        console.error(error)
                    }
                    break;

                    case 'atualizar':
                        const filmeAtualizado = await inquirer.prompt([
                            {
                                message: "Digite o ID do filme: ",
                                type: "input",
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
                            
                            dados[filmeAtualizado.id] = filmeAtualizado 
                            const jsonData = JSON.stringify(dados, null, 2)
                            
                            console.log(chalk.green('Filme atualizado com sucesso!!'));
                            fs.writeFileSync('../filmes.json', jsonData, err=> {
                                if (err) throw err;
                            })
                            
    
                        } catch (error) {
                            console.error(error)
                        }
                        break;
                        
                        case 'deletar':
                            const deletarFilme = await inquirer.prompt([
                                {
                                    message: "Digite o ID do filme: ",
                                    type: "input",
                                    name: "id",
                                },
                                
        
                            ]);
        
                            try {
                                deletarFilme.id = parseInt(deletarFilme.id)
                                
                                const index = dados.indexOf(dados.id = deletarFilme.id)
                                if (index > -1){
                                    dados.splice(index, 1)
                                }
                                // dados.pop(dados.id = deletarFilme)
                            
                                const jsonData = JSON.stringify(dados, null, 2)
                                
                                console.log(chalk.green('Filme atualizado com sucesso!!'));
                                fs.writeFileSync('../filmes.json', jsonData, err=> {
                                    if (err) throw err;
                                })
                                
        
                            } catch (error) {
                                console.error(error)
                            }
                            break;


                

                case 'exibir':
                    const idReposta = await inquirer.prompt([
                        {
                            type: "input",
                            name: "id",
                            message: chalk.blue('Digite o ID do produto: ')
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
                    console.log(chalk.yellow('saindo do sistema...'))
                    break;
            }
        } catch (error) {
            console.error('erro', error)
        }

    };
    exibirMenu();
});