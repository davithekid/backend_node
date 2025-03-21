import axios from "axios";
import express from "express";


axios.post('http://localhost:3000/filmes/', {
    id: 11,
    nome: 'Superbad',
    genero: 'comédia'
})

    .then(response => {
        console.log('Dados recebidos: ', response.data)
    })
    .catch(error => {
        console.error('Ocorreu um erro: ', error)
    })