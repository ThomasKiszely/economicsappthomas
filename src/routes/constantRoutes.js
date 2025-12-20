const express = require('express');
const router = express.Router();
const { transactionType } = require('../utils/constants');

router.get('/', (req, res) => {
    res.json(transactionType);
});

module.exports = router;