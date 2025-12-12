const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/BudgetController');
const { validateBudget } = require('../middlewares/budgetValidator');


router.put('/:id', validateBudget,budgetController.updateBudget);
router.delete('/:id', budgetController.deleteBudget);
router.get('/', budgetController.getBudgets);
router.post('/', validateBudget, budgetController.createBudget);

module.exports = router;