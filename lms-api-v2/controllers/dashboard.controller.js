const express = require('express');
const router = express.Router();
const dashboardService = require('../services/dashboard.services.js');
const checkRole = require('../_helpers/checkRole')

// routes

router.get('/', dashboardData)


module.exports = router;

function dashboardData(req, res, next) {
    dashboardService.dashboardData(req, res)
}
