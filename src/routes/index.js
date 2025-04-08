const express = require('express');
const healthController = require('../controllers/healthController');
const bankController = require('../controllers/bankController');
const investmentController = require('../controllers/investmentController');
const investmentAggregationController = require('../controllers/investmentAggregationController');

const router = express.Router();

router.get('/health', healthController.healthCheck);

router.post('/banks', bankController.createBank);
router.get('/banks', bankController.getAllBanks);
router.get('/banks/:id', bankController.getBankById);
router.delete('/banks/:id', bankController.deleteBank);
router.patch('/banks/:id', bankController.updateBank);

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
router.post('/investments', investmentController.createInvestment);
router.get('/investments', investmentController.getAllInvestments);

router.get('/investments/total', investmentAggregationController.getTotalInvestment);

module.exports = router;
