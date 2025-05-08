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

const criarLivro = async (livroData) => {
    try {
        return await create('livros', livroData)
    } catch (err) {
        console.error('Erro ao criar livro ', err);
        throw err;
    }
}

const atualizarLivro = async (livroData, id) => {
        try {
            return await update('livros', livroData, `id = ${id}`);
        } catch (err) {
            console.error('Erro ao atualizar livro', err)
            throw err;
        }
}

const excluirLivro = async(id) => {
    try {
        return await update('livros', `id = ${id}`);
    } catch (err) { 
        console.error('Erro ao excluir o livro' , err)
        throw err;
    } 
}

export { listarLivros, obterLivroPorId, criarLivro, atualizarLivro, excluirLivro };