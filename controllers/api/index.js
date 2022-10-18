const router = require('express').Router();

const user = require('./userRoutes');
const thought = require('./thoughtsRoutes');

router.use('/users', user);
router.use('/thoughts', thought);



module.exports = router;
