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
        response.length === 0
            ?res.json({message: `No thought with id ${req.params.id}`})
            :res.status(200).json(response);
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
        let findUser = await User.findOneAndUpdate(
            {
                username: req.body.username,
                _id: req.body.userId

            },
            { $addToSet: { thoughts: newThought._id } },
        )
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
        let thought = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { thoughtText: req.body.thoughtText },
            { new: true });
        !thought
            ?res.json({message: `No thought found with id: ${req.params.id}`})
            :res.status(200).json(thought);
    } catch (err) {
        err.name === 'CastError'
        ?res.json({message: 'Invalid userId'})
        :res.status(500).json(err);
    }
});

//Delete route for thought with id
router.delete('/:id', async (req, res) => {
    try {
        let response = await Thought.findOneAndDelete({ _id: req.params.id }, {new: true});
        if (!response) {
            return res.status(404).json(`No thought found with id: ${req.params.id}`)
        }
        let user = await User.findOneAndUpdate(
            {thoughts: req.params.id},
            {$pull: {thoughts: req.params.id}}
        );
        if (!user) {
            return res.status(404).json(`No user found with associated thoughtId: ${req.params.id}`);
        }
        if (response && user) {
            res.status(200).json({message: `Thought successfully deleted with id: ${req.params.id}` });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//Post route for reaction to single thought
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        let reaction = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body }},
            {new: true}
            );
        res.status(200).json(reaction);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete route for reaction to single thought
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        let reaction = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            //Normally pull deletes one instance of specified value, but in this case, reactions holds subdocuments, and pull matches the _id with 
            //req.params.reactionId and deletes the entire subdocument since reaciton is only a schema and therefore a subdocument,
            //unlike thoughts and friends in users which are arrays of just the thoughts or users _ids, so easier so $pull in those cases
            {$pull: {reactions: {_id: req.params.reactionId} }},
            {new: true}
            );
        res.status(200).json(reaction);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;