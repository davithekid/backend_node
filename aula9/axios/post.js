const axios = require('axios');

axios.post('https://jsonplaceholder.typicode.com/todos', {
    userId: 1,
    tittle: "Comprar pão",
    complete: false
})

    .then(response => {
        console.log('Dados recebidos: ', response.data)
    })
    .catch(error => {
        console.error('Ocorreu um erro: ', error)
    })