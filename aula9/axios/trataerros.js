const axios = require('axios');
const { response } = require('express');

axios.get('https://jsonplaceholder.typicode.com/todos/212')

    .then(response => {
        console.log('Dados recebidos: ', response.data)
    })
    .catch(error => {
        console.error('Ocorreu um erro: ', error.message)
        console.error('Codigo de status: ', error.response.status)
        console.error('Ocorreu um erro: ', error.response.statusText)
    })