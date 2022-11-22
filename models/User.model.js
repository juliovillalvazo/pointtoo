const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: false,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        type: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        userRatings: {
            type: [{ type: Schema.Types.ObjectId, ref: 'Rating' }],
        },
        userComments: {
            type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
        },
        bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Country' }],
        pictureUrl: String,
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

const User = model('User', userSchema);

module.exports = User;
