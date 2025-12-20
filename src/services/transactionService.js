const transactionRepo = require('../data/transactionRepo');
const budgetRepo = require('../data/budgetRepo');

async function createTransaction(transaction) {
    const type = transaction.type;
    let amount;
    if (transaction.type === 'withdrawal') {
        amount = -Number(transaction.amount);
    }
    else if (transaction.type === 'deposit') {
        amount = Number(transaction.amount);
    }
    const id = transaction.budget;
    savedAmount = await budgetRepo.updateAmount(id, amount);
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