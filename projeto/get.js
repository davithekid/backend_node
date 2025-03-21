import axios from "axios"
import e from "express"

axios.get('http://localhost:3000/filmes')

    .then(response => {
        console.log('Dados recebidos: ', response.data)
    })
    .catch(error => {
        console.error('Ocorreu um erro: ', error)
    })