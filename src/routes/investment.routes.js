const express = require('express');
const investmentController = require('../controllers/investmentController');

const router = express.Router();

/**
 * @swagger
 * /investments:
 *   post:
 *     summary: Cria um novo investimento
 *     tags: [Investments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - bankId
 *               - maturityDate
 *               - isLocked
 *             properties:
 *               amount:
 *                 type: number
 *               bankId:
 *                 type: integer
 *               maturityDate:
 *                 type: string
 *                 format: date
 *               isLocked:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Investimento criado com sucesso
 *       400:
 *         description: Erro de validação
 */
router.post('/', investmentController.createInvestment);
router.get('/', investmentController.getAllInvestments);
router.get('/:id', investmentController.getInvestmentById);
router.delete('/:id', investmentController.deleteInvestment);

module.exports = router;
