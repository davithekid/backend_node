import axios from 'axios';
import express from "express";

axios.patch('http://localhost:3000/filmes/2', {
    id: 2,
    nome: 'Poderoso chefão',
    genero: 'eita'
    
})

    .then(response => {
        console.log('Cátalogo adicionado com sucesso: \n', response.data)
    })
    .catch(error => {
        console.error('Ocorreu um erro: ', error)
    })