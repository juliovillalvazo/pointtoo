const router = require('express').Router();
const Country = require('../models/Country.model');
const Comment = require('../models/Comment.model');
const User = require('../models/User.model');

router.get('/country', async (req, res) => {
    const countries = await Country.find({})
        .populate('comments')
        .populate({
            // we are populating author in the previously populated comments
            path: 'comments',
            populate: {
                path: 'author',
                model: 'User',
            },
        });
    const randNum = Math.floor(Math.random() * countries.length);
    res.render('countries/country', {
        user: req.session.currentUser,
        country: countries[randNum],
    });
});

router.get('/country/:id', async (req, res) => {
    const country = await Country.findById(req.params.id)
        .populate('comments')
        .populate({
            // we are populating author in the previously populated comments
            path: 'comments',
            populate: {
                path: 'author',
                model: 'User',
            },
        });

    res.render('countries/country', { country, user: req.session.currentUser });
});

router.post('/country/:id/comment', async (req, res) => {
    try {
        const { id } = req.params;

        const { comment } = req.body;
        const newComment = await Comment.create({
            author: req.session.currentUser._id,
            description: comment,
            country: id,
        });
        const country = await Country.findByIdAndUpdate(id, {
            $push: { comments: newComment },
        });

        await User.findByIdAndUpdate(req.session.currentUser._id, {
            $push: { userComments: newComment },
        });

        res.redirect(`/country/${country.id}`);
    } catch (err) {
        console.log(err);
    }
});

router.get('/country/:id/bookmark', async (req, res) => {
    const { id } = req.params;
    const country = await Country.findById(id)
        .populate('comments')
        .populate({
            // we are populating author in the previously populated comments
            path: 'comments',
            populate: {
                path: 'author',
                model: 'User',
            },
        });
    const user = await User.findById(req.session.currentUser._id);

    console.log(user);

    if (user.bookmarks.includes(id)) {
        return res.render('countries/country', {
            user,
            country,
            errorMessage: 'cannot bookmark twice',
        });
    }
    const updatedUser = await User.findByIdAndUpdate(
        req.session.currentUser._id,
        {
            $push: { bookmarks: id },
        }
    );
    res.redirect(`/country/${id}`);
});

router.get('/create-country', (req, res) => {
    res.render('countries/createcountry', { user: req.session.currentUser });
});

module.exports = router;
