//Er som controller, der modtager request og sender respons. Placeret her fordi det er en controller...

const budgetService = require('../services/budgetService');

async function createBudget(req, res, next) {
    try {
        const budget = req.body;
        const newBudget = await budgetService.createBudget(budget);
        return res.status(201).json({ success: true, data: newBudget });
    } catch (error){
        next(error);
    }
}

async function getBudgets(req, res, next) {
    try{
        const budgets = await budgetService.getBudgets();
        return res.status(200).json({ success: true, data: budgets });
    } catch (error){
        next(error);
    }
}

async function getBudgetById(req, res, next) {
    try{
        const id = req.params.id;
        const budget = await budgetService.getBudgetById(id);
        return res.status(200).json({ success: true, data: budget });
    } catch (error){
        next(error);
    }
}

async function updateBudget(req, res, next) {
    try {
        const id = req.params.id;
        const budget = req.body;
        const updatedBudget = await budgetService.updateBudget(id, budget);
        return res.status(200).json({ success: true, data: updatedBudget });
    } catch (error){
        next(error);
    }
}

async function deleteBudget(req, res, next) {
    try {
        const id = req.params.id;
        const deletedBudget = await budgetService.deleteBudget(id);
        return res.status(204).end({});
    } catch (error){
        next(error);
    }
}

module.exports = {
    createBudget,
    getBudgets,
    getBudgetById,
    updateBudget,
    deleteBudget,
}