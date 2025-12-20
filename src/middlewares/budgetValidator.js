function validateBudget(req, res, next) {
    const { name, startDate, endDate, startAmount, actualAmount } = req.body;
    const errors = [];
    if (typeof(name) !== 'string' || name.trim().length === 0) {
        errors.push('Name is required');
    }
    const startD = new Date(startDate);
    if (!startDate || isNaN(startD.getTime())) {
        errors.push('StartDate is invalid');
    }
    const endD = new Date(endDate);
    if (!endDate || isNaN(endD.getTime())) {
        errors.push('EndDate is invalid');
    }
    if (!Number.isFinite(startAmount)) {
        errors.push('StartAmount is invalid');
    }
    if (actualAmount && !Number.isFinite(actualAmount)) {
        errors.push('EndAmount is invalid');
    }
    if (errors.length > 0) {
        return res.status(400).send({ errors: errors });
    }
    next();
}

module.exports = {
    validateBudget,
}

/*
name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startAmount: { type: Number, required: true },
    endAmount: { type: Number, required: true },
 */