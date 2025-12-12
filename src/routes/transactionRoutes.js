const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { validateTransaction } = require('../middlewares/transactionValidator');

//Husk nu for helvede rækkefølgen... De mere specifikke først...

router.put('/:id', validateTransaction, transactionController.updateTransaction);
router.get('/:id', transactionController.getTransactionsByBudget);
router.delete('/:id', transactionController.deleteTransaction);
router.post('/', validateTransaction, transactionController.createTransaction);

module.exports = router;