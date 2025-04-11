const express = require('express');
const investmentHistoryController = require('../controllers/investmentHistoryController');

const router = express.Router();

router.post('/', investmentHistoryController.createInvestmentHistory);
router.get('/latest', investmentHistoryController.retrieveLatestInvestmentHistory);
router.get('/:id', investmentHistoryController.retrieveInvestmentHistoryByInvestmentId);
// DELETE ONE HISTORY

module.exports = router;
