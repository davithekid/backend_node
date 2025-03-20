const axios = require('axios');

axios.put('https://jsonplaceholder.typicode.com/todos/5', {
    userId: 1,
    title: "Comprar pão",
    complete: true
})

    .then(response => {
        console.log('Dados Atualizados: ', response.data)
    })
    .catch(error => {
        console.error('Ocorreu um erro: ', error)
    })