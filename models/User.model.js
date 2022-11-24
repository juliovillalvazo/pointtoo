// importan scheema & model to design user model
const { Schema, model } = require('mongoose');

// defining user structure schema. will require username,password,type:{guess by default}, 
// userRatings, userComments, bookmarks, pictureUrl
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            // username is mandetory to define a new user in DB.
            unique: true,
            //this wont allowed repeated usernames
            trim: true,
            //this wont allow any blank spaces in usernames
        },
        email: {
            type: String,
            required: true,
            // email is mandetory to define a new email in DB.
            unique: true,
            //this wont allowed repeated emails
            trim: true,
            //this wont allow any blank spaces in emails
            lowercase: true,
            // this will transform text input to lowercase.
        },
        type: {
            type: String,
            enum: ['admin', 'user'],
            //enum will always be admin or user. if you input something else will give you a error message.
            default: 'user',
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        userRatings: {
            // type only accepts array objects that bring type:schema.types.Objectid that come from model ref:'Rating'
            type: [{ type: Schema.Types.ObjectId, ref: 'Rating' }],
        },
        userComments: {
            //type:schema.types.Objectid is related too the commentId in data base ref: comment comes from the model comment.model.js
            type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
        },
        //type:schema.types.Objectid is related too the countriesId in data base ref: country comes from the model country.model.js
        bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Country' }],
        pictureUrl: {
            type: String,
            default:
                'https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg',
        },
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

const User = model('User', userSchema);

module.exports = User;
