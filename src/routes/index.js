const express = require('express');
const healthController = require('../controllers/healthController');
const bankController = require('../controllers/bankController');

const router = express.Router();

router.get('/health', healthController.healthCheck);

router.post('/banks', bankController.createBank);
router.get('/banks', bankController.getAllBanks);
router.get('/banks/:id', bankController.getBankById);
router.delete('/banks/:id', bankController.deleteBank);
router.patch('/banks/:id', bankController.updateBank);

module.exports = router;
