const transactionRepository = require('./transaction.repository');

const getAllTransactions = async (filters) => {
  return await transactionRepository.findAll(filters);
};

const getTransactionById = async (id) => {
  const transaction = await transactionRepository.findById(id);
  if (!transaction) throw { statusCode: 404, message: 'Transaction not found' };
  return transaction;
};

const createTransaction = async (userId, data) => {
  const [transaction] = await transactionRepository.create({ ...data, user_id: userId });
  return transaction;
};

const updateTransaction = async (id, data) => {
  const transaction = await transactionRepository.findById(id);
  if (!transaction) throw { statusCode: 404, message: 'Transaction not found' };

  const [updatedTransaction] = await transactionRepository.update(id, data);
  return updatedTransaction;
};

const deleteTransaction = async (id) => {
  const transaction = await transactionRepository.findById(id);
  if (!transaction) throw { statusCode: 404, message: 'Transaction not found' };

  await transactionRepository.softDelete(id);
  return { success: true };
};

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction
};
