const axios = require('axios');

axios.patch('https://jsonplaceholder.typicode.com/todos/5', {

    title: "Comprar pano"
   
})

    .then(response => {
        console.log('Dados Atualizados: ', response.data)
    })
    .catch(error => {
        console.error('Ocorreu um erro: ', error)
    })