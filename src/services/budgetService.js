const budgetRepo = require('../data/budgetRepo');

async function createBudget(budget){
    const newBudget = await budgetRepo.createBudget(budget);
    return newBudget;
}

async function getBudgets(){
    const budgets = await budgetRepo.getBudgets();
    return budgets;
}

async function getBudgetById(id){
    const budget = await budgetRepo.getBudgetById(id);
    return budget;
}

async function updateBudget(id, budget){
    const updated = await budgetRepo.updateBudget(id, budget);
    return updated;
}

async function deleteBudget(id){
    const deleted = await budgetRepo.deleteBudget(id);
    return deleted;
}

module.exports = {
    createBudget,
    getBudgets,
    getBudgetById,
    updateBudget,
    deleteBudget
}