import chalk from "chalk";
import axios from "axios";
import { response } from "express";

axios.get('https://jsonplaceholder.typicode.com/todos/999')
    .then(response => {
        console.log(chalk.bgCyan('Dados Recebidos: '))
        console.log(response.data);
    })
    .catch(error => {
        console.log(chalk.red('error'))
        console.log(chalk.yellow(error.message))
    })