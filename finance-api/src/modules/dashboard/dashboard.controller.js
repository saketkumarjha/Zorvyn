const dashboardService = require('./dashboard.service');

const getSummary = async (req, res) => res.json({ success: true, data: await dashboardService.getSummary() });
const getCategoryTotals = async (req, res) => res.json({ success: true, data: await dashboardService.getCategoryTotals() });
const getRecentActivity = async (req, res) => res.json({ success: true, data: await dashboardService.getRecentActivity() });
const getTrends = async (req, res) => res.json({ success: true, data: await dashboardService.getTrends() });

module.exports = {
  getSummary,
  getCategoryTotals,
  getRecentActivity,
  getTrends
};
