const router = require('express').Router();
const User = require('../../models/user');

//Get all users
router.get('/', (req, res) => {
    User.find({}, (err, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(500).json({ message: 'something went wrong' });
        }
    });
});

//Get a single user
router.get('/:id', (req, res) => {
    User.find({
        _id: req.params.id,
    }, (err, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(500).json({message: `No user with id: ${req.params.id} found`})
        }
    });
});

//Create a single user
router.post('/', async (req, res) => {
    try {
        let newUser = await User.create(req.body);
        if (newUser) {
            res.json(newUser);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;