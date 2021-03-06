const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const parentDashRoutes = require('./parentDash-routes.js');
const adminDashRoutes = require('./adminDash-routes.js');

const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/parentDash', parentDashRoutes);
router.use('/adminDash', adminDashRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
