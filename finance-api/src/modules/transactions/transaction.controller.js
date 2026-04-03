const transactionService = require('./transaction.service');
const { createTransactionSchema, updateTransactionSchema } = require('./transaction.schema');

const getAllTransactions = async (req, res) => {
  const transactions = await transactionService.getAllTransactions(req.query);
  res.json({ success: true, data: transactions });
};

const getTransactionById = async (req, res) => {
  const transaction = await transactionService.getTransactionById(req.params.id);
  res.json({ success: true, data: transaction });
};

const createTransaction = async (req, res) => {
  const validatedData = createTransactionSchema.parse(req.body);
  const transaction = await transactionService.createTransaction(req.user.id, validatedData);
  res.status(201).json({ success: true, data: transaction });
};

const updateTransaction = async (req, res) => {
  const validatedData = updateTransactionSchema.parse(req.body);
  const transaction = await transactionService.updateTransaction(req.params.id, validatedData);
  res.json({ success: true, data: transaction });
};

const deleteTransaction = async (req, res) => {
  await transactionService.deleteTransaction(req.params.id);
  res.status(204).send();
};

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction
};
