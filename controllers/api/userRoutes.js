const router = require('express').Router();
const User = require('../../models/user');
const Thought = require('../../models/thoughts');

//Get all users
router.get('/', async (req, res) => {
    try {
        let findAllUsers = await User.find({}, {__v: 0, id: 0});
        if (findAllUsers.length === 0) {
            res.json({message: 'There are currently no registered users'});
        } else {
            res.status(200).json(findAllUsers);
        }
    } catch (err) {
        err.name === 'CastError'
        ?res.json({message: 'Invalid userId'})
        :res.status(500).json(err);
    }
});

//Get a single user with id
router.get('/:id', async (req, res) => {
    try {
        let response = await User.find({ _id: req.params.id }, {__v: 0, id: 0});
        response.length === 0
        ?res.json({message: `No user found with id: ${req.params.id}`})
        :res.status(200).json(response);
    } catch (err) {
        err.name === 'CastError'
        ?res.json({message: 'Invalid userId'})
        :res.status(500).json(err);
    }
});


//Post a single user
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

//Put to update a user with _id
router.put('/:id', async (req, res) => {
    try {
        let updateUser = await User.findOneAndUpdate(
            {_id: req.params.id},
            {username: req.body.username},
            { new: true }
        );
        updateUser 
        ? res.status(200).json(updateUser)
        :res.json({message: `No user found with id: ${req.params.id}`})
    } catch (err) {
        err.name === 'CastError'
        ?res.json({message: 'Invalid userId'})
        :res.status(500).json(err);
    }
});

//Delete user and associated thoughts
router.delete('/:id', async (req, res) => {
    try {
        await User.find({ _id: req.params.id })
            .then((response) => {
                let thoughts = response[0].thoughts;
                for (i = 0; i < thoughts.length; i++) {
                    Thought.findOneAndDelete(
                        { _id: thoughts[i] }
                    )
                        .catch(() => {
                            res.status(404).json(`No thought found with id: ${thoughts[i]} `);
                        })
                }
                User.findByIdAndDelete({ _id: req.params.id })
                    .then(() => {
                        res.status(200).json(`User ${req.params.id} deleted`)
                    })
                    .catch(() => {
                        res.status(404).json(`No user found with id: ${req.params.id}`);
                    })
            })
            .catch(() => {
                res.status(400).json('Something went wrong');
            })
    } catch (err) {
        res.status(500).json(err);
    }
});

//Post route for adding friends
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        let newFriend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            {new: true}
        );
        res.status(200).json(newFriend);
    } catch (err) {
        console.log(err.name);
        res.status(500).json(err);
    }
});

//Delete route for deleting friends
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } }
        );
        res.status(200).json(`Friend with id: ${req.params.friendId} removed.`);
    } catch (err) {
        console.log(err.name);
        res.status(500).json(err);
    }
});

module.exports = router;