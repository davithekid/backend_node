import chalk from "chalk";
import axios from "axios";
import inquirer from "inquirer";

const API_URL = 'http://localhost:3000';

async function listarProdutos() {
    try {
        const response = await axios.get(`${API_URL}/produtos`);
        return response.data;
    } catch (error) {
        console.error(chalk.red('erro ao listar produto: '), error.message);
        return [];
    }
}

async function exibirDetalhesProdutos(id) {
    try {
        const response = await axios.get(`${API_URL}/produtos/${id}`)
        return response.data;
    } catch (error) {
        console.error(chalk.red(`erro ao exibir produtos: com ID: ${id} `), error.message);
        return null;
    }
}

async function exibirMenu() {

    console.log('\n')
    const perguntas = [
        {
            type: "list",
            name: 'opcao',
            message: chalk.yellow('escolha uma opção: '),
            choices: [
                { name: chalk.green('Listar produtos'), value: 'listar' },
                { name: chalk.green('Exibir detalhes do produto'), value: 'exibir' },
                { name: chalk.red('Sair da operação'), value: 'sair' },
            ]
        }
    ];

    try {
        const resposta = await inquirer.prompt(perguntas)

        switch (resposta.opcao) {
            case 'listar':
                const produtos = await listarProdutos();

                if (Array.isArray(produtos) && produtos.length > 0) {
                    console.log(chalk.green('Lista de Produtos: '));

                    produtos.forEach(produto => {
                        console.log(`${chalk.cyan(produto.id)}: ${chalk.blueBright(produto.nome)} - R$ ${chalk.yellow(produto.preco)}`)
                    })

                } else {
                    console.log(chalk.yellow('Nenhum produto encontrado.'))
                }

                exibirMenu();
                break;
            case 'exibir':
                const idResposta = await inquirer.prompt([
                    {
                        type: "input",
                        name: "id",
                        message: chalk.blue('Digite o ID do produto: ')

                    }
                ]);
                const produto = await exibirDetalhesProdutos(idResposta.id);
                if (produto) {
                    console.log(`${chalk.cyan(produto.id)}: ${chalk.blueBright(produto.nome)} - R$ ${chalk.yellow(produto.preco)}`)
                } else {
                    console.log(chalk.yellow('Produto não encontrado'))
                }
                exibirMenu();
                break;
            case 'sair':
                console.log(chalk.blue('saindo do sistema...'))
                break;
        }

    } catch (error) {
        console.error('erro', error)
    }


}

exibirMenu();