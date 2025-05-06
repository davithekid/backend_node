import { listarLivros, obterLivroPorId } from "../models/Livro.js";

const listarLivroController = async (req, res) => {
    try {
        const livros = await listarLivros()
        res.status(200).send(livros)
    } catch (err) {
        res.status(500).json({message: 'Erro interno no servidor', err})
        console.error(err)
    }
};

const obterLivroPorIdController = async (req, res) => {
    try {
        const livro = await obterLivroPorId(req.params.id)
        
        if(!livro){
            return res.status(404).json({message: 'Livro não encontrado'});
        }

        return res.status(200).json(livro)

    } catch (err) {
        res.status(500).json({message: 'Erro interno no servidor', err})
        console.error('Erro ao obter livro por ID: ', err)
    }
};

export {listarLivroController, obterLivroPorIdController}

