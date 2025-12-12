//Det er en model, så placeret under models.
const mongoose = require("mongoose");


const budgetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startAmount: { type: Number, required: true },
    endAmount: { type: Number, required: true },
});

module.exports = mongoose.model("Budget", budgetSchema);