const transactionRepo = require('../data/transactionRepo');

async function createTransaction(transaction) {
    const newTransaction = await transactionRepo.createTransaction(transaction);
    return newTransaction;
}

async function getTransactionsByBudget(budgetId) {
    const transactions = await transactionRepo.getTransactionsByBudget(budgetId);
    return transactions;
}

async function updateTransaction(id, transaction) {
    const updatedTransaction = await transactionRepo.updateTransaction(id, transaction);
    return updatedTransaction;
}

async function deleteTransaction(id) {
    const deleted  = await transactionRepo.deleteTransaction(id);
    return deleted;
}

module.exports = {
    createTransaction,
    getTransactionsByBudget,
    updateTransaction,
    deleteTransaction,
}