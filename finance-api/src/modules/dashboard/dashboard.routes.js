const express = require('express');
const router = express.Router();
const dashboardController = require('./dashboard.controller');
const authenticate = require('../../middleware/authenticate');
const authorize = require('../../middleware/authorize');
const { PERMISSIONS } = require('../../constants/permissions');

router.use(authenticate);
router.use(authorize(PERMISSIONS.DASHBOARD_BASIC));

router.get('/summary', dashboardController.getSummary);
router.get('/category-totals', dashboardController.getCategoryTotals);
router.get('/recent-activity', dashboardController.getRecentActivity);
router.get('/trends', dashboardController.getTrends);

module.exports = router;
