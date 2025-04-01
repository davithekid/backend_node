import axios from "axios";


axios.post('http://localhost:3000/filmes/', {
    id: 11,
    nome: 'Superbad',
    genero: 'comédia'
})

    .then(response => {
        console.log('Filme adicionado ao catálogo com sucesso!!!\n: ', response.data)
    })
    .catch(error => {
        console.error('Ocorreu um erro: ', error)
    })

 