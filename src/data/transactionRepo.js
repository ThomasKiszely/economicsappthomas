const Transaction = require('../models/Transaction');

async function createTransaction(transaction) {
    const newTransaction = new Transaction(transaction);
    const savedTransaction = await newTransaction.save();
    return savedTransaction;
}

async function getTransactionsByBudget(budgetId) {
    const transactions = await Transaction.find( { budget: budgetId } );
    return transactions;
}

async function updateTransaction(id, transaction) {
    const updatedTransaction = await Transaction.findByIdAndUpdate(id, transaction);
    return updatedTransaction;
}

async function deleteTransaction(id) {
    const deleted  = await Transaction.findByIdAndDelete(id);
    return deleted;
}

module.exports = {
    createTransaction,
    getTransactionsByBudget,
    updateTransaction,
    deleteTransaction,
}