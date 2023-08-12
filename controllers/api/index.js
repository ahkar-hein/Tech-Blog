const router = require('express').Router();
const userRoutes = require('./userRoute');
const commentRoutes = require('./commentRoute')


router.use('/users', userRoutes);
router.use('/comments', commentRoutes);

module.exports = router;