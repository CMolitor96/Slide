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

//Get a single thought with id
router.get('/:id', async (req, res) => {
    try {
        let response = await Thought.find({ _id: req.params.id });
        res.status(200).json(response);
    } catch (err) {
        if (err.name === 'CastError') {
            res.status(404).json({ message: `No thought with id: ${req.params.id} found` })
        } else {
            res.status(500).json(err);
        }
    }
});


//Post a single thought
router.post('/', async (req, res) => {
    try {
        let newThought = await Thought.create(req.body);
        // console.log(newThought);
        let findUser = await User.findOneAndUpdate(
            {
                username: req.body.username,
                _id: req.body.userId

            },
            { $addToSet: { thoughts: newThought._id } },
            // { runValidators: true, new: true }
        )
        // console.log(findUser);
        if (newThought && findUser) {
            res.status(200).json(newThought);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//Update a single thought with id
router.put('/:id', async (req, res) => {
    try {
        await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { thoughtText: req.body.thoughtText },
            { new: true }
        )
            .then((response) => {
                res.status(200).json(response);
            })
            .catch(() => {
                res.status(404).json(`No thought found with id: ${req.params.id}`);
            })
    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete route for thought with id
router.delete('/:id', async (req, res) => {
    try {
        let response = await Thought.findOneAndDelete({ _id: req.params.id });
        !response
            ? res.status(404).json(`No thought found with id: ${req.params.id}`)
            : res.status(200).json(response);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Post route for reaction to single thought
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        // let reactionBody = req.body.reactionBody;
        let reaction = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body }},
            {new: true}
            );
        res.status(200).json(reaction);
    } catch (err) {
        console.log(err);
        console.log(err.name);
        res.status(500).json(err);
    }
});

module.exports = router;