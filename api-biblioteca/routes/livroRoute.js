import Router from 'express'
import { listarLivroController, obterLivroPorIdController } from '../controllers/LivroController.js';
const router = Router();

router.get('/', listarLivroController);
router.get('/:id', obterLivroPorIdController)

router.options('/', (req, res) => {
    res.setHeader('Allow', 'GET, OPTIONS');
    res.status(204).send();
})

router.options('/:id', (req, res) => {
    res.setHeader('Allow', 'GET, OPTIONS');
    res.status(204).send();
})
export default router;