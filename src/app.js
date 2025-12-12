const express = require('express');
const app = express();
const path = require('path');
const transactionRouter = require('./routes/transactionRoutes');
const budgetRouter = require('./routes/budgetRoutes');
const { notFound } = require('./middlewares/notFound');
const { errorHandler } = require('./middlewares/errorHandler');
const { log } = require('./middlewares/logger');
const { connectToMongo } = require('./services/db');
connectToMongo();
//npx nodemon server eller npm run dev for at starte nodemon - ctrl-c for at afslutte

// Middleware
app.use(express.json());
app.use(log);
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes
app.use('/api/budgets', budgetRouter);
app.use('/api/transactions', transactionRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;