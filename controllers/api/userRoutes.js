const router = require('express').Router();
const User = require('../../models/user');

//Get all users
router.get('/', async (req, res) => {
    try {
        let findAllUsers = await User.find({});
        if (findAllUsers.length === 0) {
            res.json('There are currently no registered users');
        } else {
            res.status(200).json(findAllUsers);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get a single user
router.get('/:id', async (req, res) => {
    try {
        let findSingleUser = await User.find({_id: req.params.id});
        if (findSingleUser) {
            res.status(200).json(findSingleUser);
        } else {
            console.log('here');
            res.status(404).json(`No user with id: ${req.params.id} found`);
        }
    } catch (err) {
        res.status(500).json(err);
    }
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