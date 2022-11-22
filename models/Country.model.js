const { Schema, model } = require('mongoose');

// Country blueprint
const countrySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    funFacts: {
        type: String,
        required: true,
    },
    capital: {
        type: String,
        required: true,
    },
    famousDish: {
        type: String,
        required: true,
    },
    pictureUrl: {
        type: String,
        required: true,
    },
    // comments will be referenced by Id based on the Comment model
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    rating: [{ type: Schema.Types.ObjectId, ref: 'Rating' }],
});

module.exports = model('Country', countrySchema);
