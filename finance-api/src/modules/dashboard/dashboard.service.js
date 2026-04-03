const db = require('../../config/db');

const getSummary = async () => {
  const totalsQuery = await db('transactions')
    .whereNull('deleted_at')
    .select('type')
    .sum('amount as total')
    .groupBy('type');
    
  let totalIncome = 0;
  let totalExpense = 0;
  
  totalsQuery.forEach(row => {
    if (row.type === 'income') totalIncome = parseFloat(row.total);
    if (row.type === 'expense') totalExpense = parseFloat(row.total);
  });
  
  return {
    netBalance: totalIncome - totalExpense,
    totalIncome,
    totalExpense
  };
};

const getCategoryTotals = async () => {
  const categoryTotals = await db('transactions')
    .whereNull('deleted_at')
    .where('type', 'expense')
    .select('category')
    .sum('amount as total')
    .groupBy('category');

  return categoryTotals.map(row => ({ category: row.category, total: parseFloat(row.total) }));
};

const getRecentActivity = async () => {
  return await db('transactions')
    .whereNull('deleted_at')
    .orderBy('date', 'desc')
    .limit(5);
};

const getTrends = async () => {
  const trends = await db('transactions')
    .whereNull('deleted_at')
    .select(db.raw("date_trunc('month', date) as month"))
    .select('type')
    .sum('amount as total')
    .groupBy(1, 2)
    .orderBy(1, 'desc')
    .limit(12);

  return trends.map(row => ({
    month: row.month,
    type: row.type,
    total: parseFloat(row.total)
  }));
};

module.exports = {
  getSummary,
  getCategoryTotals,
  getRecentActivity,
  getTrends
};
