import { listarLivros, obterLivroPorId, criarLivro, atualizarLivro, excluirLivro } from "../models/Livro.js";
import { fileURLToPath } from 'url';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const listarLivroController = async (req, res) => {
    try {
        const livros = await listarLivros()
        res.status(200).send(livros)
    } catch (err) {
        res.status(500).json({ message: 'Erro interno no servidor', err })
        console.error(err)
    }
};

const obterLivroPorIdController = async (req, res) => {
    try {
        const livro = await obterLivroPorId(req.params.id)

        if (!livro) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        return res.status(200).json(livro)

    } catch (err) {
        res.status(500).json({ message: 'Erro interno no servidor', err })
        console.error('Erro ao obter livro por ID: ', err)
    }
};

const criarLivroController = async (req, res) => {
    try {
        const { titulo, descricao, isbn } = req.body;
        let capaPath = null;
        if (req.file) {
            capaPath = req.file.path.replace(__filename.replace('\\controllers', ''), '')
        }

        const livroData = {
            titulo: titulo,
            descricao: descricao,
            isbn: isbn,
            capa: capaPath
        }

        const livroId = await criarLivro(livroData);
        res.status(201).json({message: 'Livro criado com sucesso.', livroId});

    } catch (err) {
        console.error('Erro ao criar livro: ', err);
        res.status(500).json({message: 'Erro ao criar livro'})
    }
}

const atualizarLivroController = async (req, res) => {
    try {

        const livroId = req.params.id ;
        const { titulo, descricao, isbn} = req.body;
        
        let capaPath = null;
        if (req.file) {
            capaPath = req.file.path.replace(__filename.replace('\\controllers', ''), '')
    }
    
    const livroData = {
        titulo: titulo,
        descricao: descricao,
        isbn: isbn,
        capa: capaPath
    }
    await atualizarLivro(livroId, livroData);
    res.status(200).json({message: 'Livro atualizado com sucesso.', livroId});

} catch (err) {
    console.error('Erro ao atualizar livro: ', err);
    res.status(500).json({message: 'Erro ao atualizar livro'})
}
}
    
const excluirLivroController = async (req, res) => {
        try {
            const livroId = req.params.id;
            await excluirLivro(livroId)
            res.status(200).json({message: 'Livro excluído com sucesso. ', livroId})
        } catch (err) {
            console.error('Erro ao excluir livro: ', err);
            res.status(500).json({message: 'Erro ao excluir livro'})
        }
}

export { listarLivroController, obterLivroPorIdController, atualizarLivroController, criarLivroController, excluirLivroController }

