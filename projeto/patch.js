import axios from 'axios';
import express from "express";

axios.patch('http://localhost:3000/filmes/2', {
    id: 2,
    nome: 'O Poderoso chefão',
    genero: 'Crime'
    
})

    .then(response => {
        console.log('Filme atualizado com sucesso: \n', response.data)
    })
    .catch(error => {
        console.error('Ocorreu um erro: ', error)
    })