const { Schema, model } = require('mongoose');
const reactionSchema = require('./reactions');

const thoughtSchema = new Schema({
    thoughtText: {
        String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        String,
        required: true,
    },
    reactions: [reactionSchema],
    toJSON: {
        virtuals: true,
    }
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});
thoughtSchema.virtual('formattedCreatedAt').get(function() {
    let date = this.createdAt;
    return date.toLocaleString();
});

const newThought = model('Thought', thoughtSchema);

module.exports = newThought;