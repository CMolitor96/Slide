const router = require('express').Router();

const user = require('./userRoutes');
const thought = require('./thoughtsRouts');

router.use('/users', user);
router.use('/thoughts', thought);



module.exports = router;
