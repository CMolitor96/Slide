const router = require('express').Router();
const User = require('../../models/user');
const Thought = require('../../models/thoughts');

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
        await User.find({_id: req.params.id})
            .then((response) => {
                if (response.length === 0) {
                    res.status(404).json({message: `No user with id: ${req.params.id} found`})
                } else {
                res.status(200).json(response);
                }
            })
            .catch(() => {
                res.status(404).json({message: `No thought with id: ${req.params.id} found`})
            })
    } catch (err) {
        res.status(500).json(err);
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
        await User.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                username: req.body.username
            },
            {new: true}
        )
        .then((response) => {
            res.status(200).json(response)
        })
        .catch(() => {
            res.status(404).json(`No user found with id: ${req.params.id}`)
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete user and associated thoughts
router.delete('/:id', async (req, res) => {
    try {
        // await User.deleteOne({_id: req.params.id})
        await User.find({_id: req.params.id})
            .then((response) => {
                let thoughts = response[0].thoughts;
                for (i = 0; i < thoughts.length; i++) {
                    Thought.findOneAndDelete(
                        {_id: thoughts[i] }
                    )
                    // .then((response) => {
                    //     // console.log(response);
                    // })
                    .catch(() => {
                        res.status(404).json(`No thought found with id: ${thoughts[i]} `);
                    })
                }
                User.findByIdAndDelete({_id: req.params.id})
                    .then(() => {
                        res.status(200).json(`User ${req.params.id} deleted`)
                    })
                    .catch(() => {
                        res.status(404).json(`No user found with id: ${req.params.id}`);
                    })
            })
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;