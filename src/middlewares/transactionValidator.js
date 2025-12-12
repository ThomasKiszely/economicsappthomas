const mongoose = require('mongoose');

function validateTransaction(req, res, next) {
    const { description, amount, date, budget } = req.body
    const errors = [];
    if (typeof description !== 'string' || description.trim().length === 0) {
        errors.push('Description must be a string');
    }
    if (!Number.isFinite(amount)) {
        errors.push('Amount must be a number');
    }
    const d = new Date(date);
    if (!date || isNaN(d.getTime())) {
        errors.push('Date must be a date');
    }
    if (!mongoose.Types.ObjectId.isValid(budget)) {
        errors.push('Budget is invalid');
    }
    if (errors.length > 0) {
        return res.status(400).send({ errors: errors });
    }
    next();
}

module.exports = {
    validateTransaction,
}