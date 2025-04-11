const express = require('express');
const bankController = require('../controllers/bankController');

const router = express.Router();

router.post('/', bankController.createBank);
router.get('/', bankController.getAllBanks);
router.get('/:id', bankController.getBankById);
router.patch('/:id', bankController.updateBank);
router.delete('/:id', bankController.deleteBank);

module.exports = router;
