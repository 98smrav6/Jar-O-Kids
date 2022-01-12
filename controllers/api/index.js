const router = require('express').Router();

const studentRoutes = require('./student-routes');
const parentRoutes = require('./parent-routes');
const adminRoutes = require('./admin-routes')

router.use('/users', studentRoutes);
router.use('/parents', parentRoutes);
router.use('/admins', adminRoutes);

module.exports = router;
