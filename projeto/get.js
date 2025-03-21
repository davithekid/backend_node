import axios from "axios"
import express from "express"

axios.get('http://localhost:3000/filmes/')

    .then(response => {
        console.log('Cátalogo completo recebido: ', response.data)
    })
    .catch(error => {
        console.error('Ocorreu um erro: ', error)
    })

axios.get('http://localhost:3000/filmes/1')

    .then(response => {
        console.log('ID filme recebido: ', response.data)
    })
    .catch(error => {
        console.error('Ocorreu um erro: ', error)
    })

