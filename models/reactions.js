const { Schema } = require('mongoose');

const newReaction = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

newReaction.virtual('formattedCreatedAt').get(function () {
    let date = this.createdAt;
    return date.toLocaleString();
})

module.exports = newReaction;