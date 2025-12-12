//Er som controller, der modtager request og sender respons. Placeret her fordi det er en controller...

const transactionService = require('../services/transactionService');

async function createTransaction(req, res, next) {
    try{
        const transaction = req.body;
        const createdTransaction = await transactionService.createTransaction(transaction);
        return res.status(201).json( { success: true, data: createdTransaction });
    } catch (error) {
        next(error);
    }
}

async function getTransactionsByBudget(req, res, next) {
    try {
        const id = req.params.id;
        const transactions = await transactionService.getTransactionsByBudget(id);
        return res.status(200).json( { success: true, data: transactions });
    } catch (error) {
        next(error);
    }
}

async function updateTransaction(req, res, next) {
    try {
        const id = req.params.id;
        const transaction = req.body;
        const updatedTransaction = await transactionService.updateTransaction(id, transaction);
        return res.status(200).json( { success: true, data: updatedTransaction });
    } catch (error) {
        next(error);
    }
}

async function deleteTransaction(req, res, next) {
    try {
        const id = req.params.id;
        const transaction = await transactionService.deleteTransaction(id);
        return res.status(204).end();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createTransaction,
    getTransactionsByBudget,
    updateTransaction,
    deleteTransaction,
}