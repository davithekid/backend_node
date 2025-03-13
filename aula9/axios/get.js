const axios = require('axios');
const { response } = require('express');

axios.get('https://jsonplaceholder.typicode.com/todos')

    .then(response => {
        console.log('Dados recebidos: ', response.data)
    })
    .catch(error => {
        console.error('Ocorreu um erro: ', error)
    })