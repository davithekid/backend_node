import chalk from "chalk";
import axios from "axios";
import inquirer from "inquirer";

const API_URL = 'http://localhost:3000';

async function catalago() {
    try {
        const response = await axios.get(`${API_URL}/filmes`);
        return response.data;
    } catch (error) {
        console.error(chalk.red('Erro ao listar filmes:'), error.message);
        return [];
    }
}

async function exibirDetalhesFilme(id) {
    try {
        const response = await axios.get(`${API_URL}/filmes/${id}`);
        return response.data;
    } catch (error) {
        console.error(chalk.red(`Erro ao exibir filme com o id: ${id}`), error.message);
        return null;
    }
}

async function exibirMenu() {
    const perguntas = [
        {
            type: "list",
            name: "opcao",
            message: chalk.yellowBright('Escolha uma opção: '),
            choices: [
                { name: chalk.cyanBright('Exibir Catálogo'), value: 'listar' },
                { name: chalk.cyanBright('Exibir detalhes do filme'), value: 'exibir' },
                { name: chalk.magentaBright.bold('Modo Administrador'), value: 'admin' },
                { name: chalk.cyanBright('Sair da operação'), value: 'sair' }
            ]
        }
    ];

    const resposta = await inquirer.prompt(perguntas);

    switch (resposta.opcao) {
        case 'listar':
            const filmes = await catalago();
            if (Array.isArray(filmes) && filmes.length > 0) {
                console.log(chalk.green('Catálogo'));
                filmes.forEach(filme => {
                    console.log(`${chalk.cyan(filme.id)}: ${chalk.blueBright(filme.nome)}, ${chalk.yellow(filme.genero)}`);
                });
            } else {
                console.log(chalk.yellow('Nenhum filme encontrado.'));
            }
            return exibirMenu();

        case 'exibir':
            const idResposta = await inquirer.prompt([
                {
                    type: "input",
                    name: "id",
                    message: chalk.blue('Digite o ID do filme: ')
                }
            ]);
            const filme = await exibirDetalhesFilme(idResposta.id);
            if (filme) {
                console.log(`${chalk.cyan(filme.id)}: ${chalk.blueBright(filme.nome)} ${chalk.yellow(filme.genero)}`);
            } else {
                console.log(chalk.yellow('Filme não encontrado'));
            }
            return exibirMenu();

        case 'admin':
            const admin = await inquirer.prompt([
                { message: 'Digite a senha: ', type: 'password', name: 'senha' }
            ]);

            if (admin.senha === 'SEGREDO') {
                console.log(chalk.green('Entrando no modo admin...'));
                await exibirMenuADM();
            } else {
                console.log(chalk.red("Senha incorreta!"));
                return exibirMenu();
            }
            break;

        case 'sair':
            console.log(chalk.green("Saindo..."));
            process.exit();
    }
}

async function exibirMenuADM() {
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
                { name: chalk.cyanBright('Voltar ao menu principal'), value: 'voltar' }
            ]
        }
    ];

    const respostaADM = await inquirer.prompt(menuADM);

    switch (respostaADM.opcaoADM) {
        case 'listar':
            const filmes = await catalago();
            if (Array.isArray(filmes) && filmes.length > 0) {
                console.log(chalk.green('Catálogo (Modo Admin)'));
                filmes.forEach(filme => {
                    console.log(`${chalk.cyan(filme.id)}: ${chalk.blueBright(filme.nome)}, ${chalk.yellow(filme.genero)}`);
                });
            } else {
                console.log(chalk.yellow('Nenhum filme encontrado.'));
            }
            break;

        case 'exibir':
            const idResposta = await inquirer.prompt([
                {
                    type: "input",
                    name: "id",
                    message: chalk.blue('Digite o ID do filme: ')
                }
            ]);
            const filme = await exibirDetalhesFilme(idResposta.id);
            if (filme) {
                console.log(`${chalk.cyan(filme.id)}: ${chalk.blueBright(filme.nome)} ${chalk.yellow(filme.genero)}`);
            } else {
                console.log(chalk.yellow('Filme não encontrado'));
            }
            break;

        case 'adicionar':
            const adicionar = await inquirer.prompt([
                { message: "Digite o nome do filme:", type: "input", name: "nome" },
                { message: "Digite o gênero do filme:", type: "input", name: "genero" }
            ]);
            try {
                await axios.post(`${API_URL}/filmes`, adicionar);
                console.log(chalk.green("Filme adicionado com sucesso!"));
            } catch (err) {
                console.error(chalk.red("Erro ao adicionar filme:"), err.message);
            }
            break;

        case 'atualizar':
            const atualizar = await inquirer.prompt([
                { message: "Digite o ID do filme:", type: "input", name: "id" },
                { message: "Digite o novo nome:", type: "input", name: "nome" },
                { message: "Digite o novo gênero:", type: "input", name: "genero" }
            ]);
            try {
                await axios.put(`${API_URL}/filmes/${atualizar.id}`, {
                    nome: atualizar.nome,
                    genero: atualizar.genero
                });
                console.log(chalk.green("Filme atualizado com sucesso!"));
            } catch (err) {
                console.error(chalk.red("Erro ao atualizar filme:"), err.message);
            }
            break;

        case 'deletar':
            const deletar = await inquirer.prompt([
                { message: "Digite o ID do filme:", type: "input", name: "id" }
            ]);
            try {
                await axios.delete(`${API_URL}/filmes/${deletar.id}`);
                console.log(chalk.green("Filme deletado com sucesso!"));
            } catch (err) {
                console.error(chalk.red("Erro ao deletar filme:"), err.message);
            }
            break;

        case 'voltar':
            return exibirMenu();
    }

    return exibirMenuADM();
}

exibirMenu();
