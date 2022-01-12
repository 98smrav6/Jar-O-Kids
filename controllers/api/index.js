const router = require('express').Router();

const userRoutes = require('./student-routes');

router.use('/students', userRoutes);

module.exports = router;
