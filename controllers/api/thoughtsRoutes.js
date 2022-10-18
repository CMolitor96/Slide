const router = require('express').Router();
const Thought = require('../../models/thoughts');
const User = require('../../models/user');

//Get all thoughts
router.get('/', async (req, res) => {
    try {
        let findAllThoughts = await Thought.find({});
        if (findAllThoughts.length === 0) {
            res.json('There are currently no thoughts created');
        } else {
            res.status(200).json(findAllThoughts);
        }
    } catch (err) {
        res.status(500).json('error');
    }
});

//Get a single thought
router.get('/:id', async (req, res) => {
    try {
        await Thought.find({_id: req.params.id})
            .then((response) => {
                if (response.length === 0) {
                    res.status(404).json({message: `No thought with id: ${req.params.id} found`})
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

//Post a single thought
router.post('/', async (req, res) => {
    try {
        let newThought = await Thought.create(req.body);
        console.log(newThought);
        let findUser = await User.findOneAndUpdate(
            {
                username: req.body.username,
                _id: req.body.userId
            
            }, 
            { $addToSet: { thoughts: newThought._id } },
            // { runValidators: true, new: true }
        )
        console.log(findUser);
        if (newThought && findUser) {
            res.status(200).json(newThought);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;