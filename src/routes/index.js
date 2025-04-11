const express = require('express');

const healthController = require('../controllers/healthController');

const bankRoutes = require('./bank.routes');
const investmentRoutes = require('./investment.routes');
const investmentHistoryRoutes = require('./investmentHistory.routes');
const investmentAggregationRoutes = require('./investmentAggregation.routes');

const router = express.Router();

router.get('/health', healthController.healthCheck);
router.use('/investments/total', investmentAggregationRoutes);
router.use('/investments', investmentRoutes);
router.use('/banks', bankRoutes);
router.use('/investmentsHistory', investmentHistoryRoutes);

module.exports = router;
