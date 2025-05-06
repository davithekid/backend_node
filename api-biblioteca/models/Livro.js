import { readAll, read } from '../config/database.js'

const listarLivros = async () => {
    try {
        return await readAll('livros')
    } catch (error) {
        console.error('Erro ao obter livros', error)
        throw error;
    }
}

const obterLivroPorId = async (id) => {
    try {
        return await read('livros', `id = ${id}`)
    } catch (error) {
        console.error('Erro ao obter livro por ID', error)
        throw error;
    }
}

export { listarLivros, obterLivroPorId };