const router = require('express').Router();

const studentRoutes = require('./student-routes');
const parentRoutes = require('./parent-routes');

router.use('/users', studentRoutes);
router.use('/parents', parentRoutes);

module.exports = router;
