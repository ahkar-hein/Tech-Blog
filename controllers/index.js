const router = require('express').Router();

// Import your API and home routes
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');

// Use the imported routers as middleware
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
