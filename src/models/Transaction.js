//Det er en model, så placeret under models...
const mongoose = require('mongoose');
const { Schema } = mongoose;


const transactionSchema = new mongoose.Schema({
    description: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    amount: { type: Number, required: true },
    budget: { type: Schema.Types.ObjectId, ref: "Budget",required: true },
});

module.exports = mongoose.model("Transaction", transactionSchema);