const Budget = require('../models/Budget');

async function createBudget(budget) {
    const newBudget = new Budget(budget);
    const savedBudget = await newBudget.save();
    return savedBudget;
}

async function getBudgets(){
    const budgets = await Budget.find({});
    return budgets;
}

async function updateBudget(id, budget){
    const updatedBudget = await Budget.findByIdAndUpdate(id, budget, { new: true, runValidators: true});
    return updatedBudget;
}

async function deleteBudget(id){
    const deleted = await Budget.findByIdAndDelete(id);
    return deleted;
}

module.exports = {
    createBudget,
    getBudgets,
    updateBudget,
    deleteBudget,
}