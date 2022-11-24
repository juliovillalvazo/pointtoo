const router = require('express').Router();
const Country = require('../models/Country.model');
const Comment = require('../models/Comment.model');
const Rating = require('../models/Rating.model');
const User = require('../models/User.model');
const { aggregate } = require('../models/User.model');

router.get('/country', async (req, res) => {
    const countries = await Country.find({})
        .populate('comments rating')
        .populate({
            // we are populating author in the previously populated comments
            path: 'comments',
            populate: {
                path: 'author',
                model: 'User',
            },
        });
    const randNum = Math.floor(Math.random() * countries.length);

    const avgRating = countries[randNum].rating
        .reduce((prev, curr, i) => {
            if (i === countries[randNum].rating.length - 1) {
                return (prev + curr.rate) / countries[randNum].rating.length;
            } else {
                return prev + curr.rate;
            }
        }, 0)
        .toFixed(2);

    res.render('countries/country', {
        user: req.session.currentUser,
        country: countries[randNum],
        avgRating,
    });
});

router.get('/country/:id', async (req, res) => {
    const country = await Country.findById(req.params.id)
        .populate('comments rating')
        .populate({
            // we are populating author in the previously populated comments
            path: 'comments',
            populate: {
                path: 'author',
                model: 'User',
            },
        });

    const avgRating = country.rating
        .reduce((prev, curr, i) => {
            if (i === country.rating.length - 1) {
                return (prev + curr.rate) / country.rating.length;
            } else {
                return prev + curr.rate;
            }
        }, 0)
        .toFixed(2);

    res.render('countries/country', {
        country,
        user: req.session.currentUser,
        avgRating,
    });
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

router.post('/create-country', async (req, res) => {
    try {
        const { name, funFacts, capital, pictureUrl, famousDish } = req.body;

        if (!name || !funFacts || !capital || !pictureUrl || !famousDish) {
            const errorMessage = 'Invalid Input: please enter all fields';
            res.render('countries/createcountry', {
                user: req.session.currentUser,
                errorMessage,
            });
            return;
        }

        const newCountry = await Country.create({
            funFacts,
            capital,
            famousDish,
            pictureUrl,
            name,
        });
        res.redirect(`/country/${newCountry.id}`);
    } catch (err) {
        console.log(err);
    }
});

router.post('/country/:idCountry/rate', async (req, res) => {
    try {
        const { idCountry } = req.params;
        const { rate } = req.body;

        if (!rate) {
            const country = await Country.findById(idCountry)
                .populate('comments rating')
                .populate({
                    // we are populating author in the previously populated comments
                    path: 'comments',
                    populate: {
                        path: 'author',
                        model: 'User',
                    },
                });
            const avgRating = country.rating
                .reduce((prev, curr, i) => {
                    if (i === country.rating.length - 1) {
                        return (prev + curr.rate) / country.rating.length;
                    } else {
                        return prev + curr.rate;
                    }
                }, 0)
                .toFixed(2);
            res.render('countries/country', {
                errorRate: 'choose a star',
                user: req.session.currentUser._id,
                country,
                avgRating,
            });
            return;
        }

        // country ratings no haya un rating.user === user.id
        const currentCountry = await Country.findById(idCountry).populate(
            'rating'
        ); // aqui conseguimos el pais con sus ratings
        if (
            currentCountry.rating.some((rate) => {
                return rate.user.toString() === req.session.currentUser._id;
            })
        ) {
            const country = await Country.findById(idCountry)
                .populate('comments rating')
                .populate({
                    // we are populating author in the previously populated comments
                    path: 'comments',
                    populate: {
                        path: 'author',
                        model: 'User',
                    },
                });
            const avgRating = country.rating
                .reduce((prev, curr, i) => {
                    if (i === country.rating.length - 1) {
                        return (prev + curr.rate) / country.rating.length;
                    } else {
                        return prev + curr.rate;
                    }
                }, 0)
                .toFixed(2);

            res.render('countries/country', {
                errorRate: 'cannot rate twice',
                user: req.session.currentUser._id,
                country,
                avgRating,
            });
            return;
        }

        const newRate = await Rating.create({
            country: idCountry,
            user: req.session.currentUser._id,
            rate,
        });

        const country = await Country.findByIdAndUpdate(idCountry, {
            $push: { rating: newRate },
        }).populate('rating');

        await User.findByIdAndUpdate(req.session.currentUser._id, {
            $push: { userRatings: newRate },
        });

        res.redirect(`/country/${country._id}`);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
