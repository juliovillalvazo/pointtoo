const { Schema, model } = require('mongoose');


const ratingSchema = new Schema({
    country: { type: Schema.Types.ObjectId, ref: 'Country' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    rate: {
        type: Number,
        min: 0,
        max: 5,
        default: 1,
    },
});

module.exports = model('Rating', ratingSchema);
