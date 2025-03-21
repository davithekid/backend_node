import axios from 'axios';
import express from "express";

axios.delete('http://localhost:3000/filmes/4', {

})

    .then(response => {
        console.log('ToDO excluido com sucesso!!!')
    })
    .catch(error => {
        console.error('Ocorreu um erro: ', error)
    })