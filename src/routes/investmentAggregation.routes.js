const express = require('express');
const investmentAggregationController = require('../controllers/investmentAggregationController');

const router = express.Router();

router.get('/', investmentAggregationController.getTotalInvestment);

module.exports = router;
