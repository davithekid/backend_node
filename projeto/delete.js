import axios from 'axios';
import express from "express";

axios.delete('http://localhost:3000/filmes/1')
   
    .then(response => {
        console.log('Filme excluído do catálogo!!!\n', response.data)
    })
    .catch(error => {
        console.error('Ocorreu um erro: ', error)
    })