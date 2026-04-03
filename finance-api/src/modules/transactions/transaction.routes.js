const express = require('express');
const router = express.Router();
const transactionController = require('./transaction.controller');
const authenticate = require('../../middleware/authenticate');
const authorize = require('../../middleware/authorize');
const { PERMISSIONS } = require('../../constants/permissions');

router.use(authenticate);

// List and get
router.get('/', authorize(PERMISSIONS.TRANSACTION_READ), transactionController.getAllTransactions);
router.get('/:id', authorize(PERMISSIONS.TRANSACTION_READ), transactionController.getTransactionById);

// Create, update, delete
router.post('/', authorize(PERMISSIONS.TRANSACTION_CREATE), transactionController.createTransaction);
router.put('/:id', authorize(PERMISSIONS.TRANSACTION_UPDATE), transactionController.updateTransaction);
router.delete('/:id', authorize(PERMISSIONS.TRANSACTION_DELETE), transactionController.deleteTransaction);

module.exports = router;
