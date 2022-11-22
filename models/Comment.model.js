const { Schema, model } = require('mongoose');

// comment blueprint
const commentSchema = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: 'User' },
        description: {
            type: String,
            required: true,
        },
        country: { type: Schema.Types.ObjectId, ref: 'Country' },
    },
    // createdAt updatedAt
    { timestamps: true }
);

module.exports = model('Comment', commentSchema);
