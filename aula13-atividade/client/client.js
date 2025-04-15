import chalk from "chalk";
import axios from "axios";
import inquirer from 'inquirer';
import db from "../express-mysql/models/db.js";
const API_URL = 'http://localhost:3000';

async function catalago() {
    try {
        const response = await axios.get(`${API_URL}/filmes`);
        return response.data;
    } catch (error) {
        console.error(chalk.red('Erro ao listar filmes: '), error.message);
        return [];
    }
}

async function exibirDetalhesFilme(id) {
    try {
        const response = await axios.get(`${API_URL}/filmes/${id}`);
        return response.data;
    } catch (error) {
        console.error(chalk.red(`Erro ao exibir com o id: ${id}`), error.message);
        return null;
    }
}

async function exibirMenu() {
    console.log('\n');
    const perguntas = [
        {
            type: "list",
            name: "opcao",
            message: chalk.yellowBright('Escolha uma opção: '),
            choices: [
                { name: chalk.cyanBright('Exibir Catálogo'), value: 'listar' },
                { name: chalk.cyanBright('Exibir detalhes do filme'), value: 'exibir' },
                { name: chalk.cyanBright('Adicionar um filme'), value: 'adicionar' },
                { name: chalk.cyanBright('Atualizar um filme'), value: 'atualizar' },
                { name: chalk.cyanBright('Deletar um filme'), value: 'deletar' },
                { name: chalk.magentaBright.bold('Modo Administrado'), value: 'admin' },
                { name: chalk.cyanBright('Sair da operação'), value: 'sair' }
            ]
        }
    ];

    try {
        const resposta = await inquirer.prompt(perguntas);

        switch (resposta.opcao) {
            case 'listar':
                const filmes = await catalago()

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

            case 'exibir':
                const idReposta = await inquirer.prompt([
                    {
                        type: "input",
                        name: "id",
                        message: chalk.blue('Digite o ID do filme: ')
                    }
                ]);

                const filme = await exibirDetalhesFilme(idReposta.id);
                if (filme) {
                    console.log(`${chalk.cyan(filme.id)}: ${chalk.blueBright(filme.nome)} ${chalk.yellow(filme.genero)}`)
                } else {
                    console.log(chalk.yellow('Filme não encontrado'))
                }
                exibirMenu();
                break;

            case 'adicionar':
                const adicionar = await inquirer.prompt([
                    {
                        message: "Digite o nome do filme: ",
                        type: "input",
                        name: "nome"
                    },
                    {
                        message: "Digite o gênero do filme: ",
                        type: "input",
                        name: "genero"
                    }
                ]);
                try {
                    axios.post(`${API_URL}/filmes`, {
                        nome: adicionar.nome,
                        genero: adicionar.genero,
                    })
                } catch (err) {
                    console.error(err);
                };
                exibirMenu();
                break;

            case 'atualizar':
                const atualizar = await inquirer.prompt([
                    {
                        message: "Digite o ID do filme: ",
                        type: "input",
                        name: "id"
                    },
                    {
                        message: "Digite o novo nome do filme: ",
                        type: "input",
                        name: "nome"
                    },
                    {
                        message: "Digite o novo gênero do filme: ",
                        type: "input",
                        name: "genero"
                    }
                ])

                try {
                    axios.put(`${API_URL}/filmes/${atualizar.id}`, {
                        nome: atualizar.nome,
                        genero: atualizar.genero
                    })
                } catch (err) {
                    console.error(err);
                }

            case 'deletar':
                const deletar = await inquirer.prompt([
                    {
                        message: "Digite o ID do filme: ",
                        type: "input",
                        name: "id"
                    }
                ])

                try {
                    axios.delete(`${API_URL}/filmes/${deletar.id}`)
                }
                catch (err) {
                    console.error(err);
                }


        } // fim switch

    } catch (err) {
        console.error(err)
    }
} // fim function
exibirMenu()



