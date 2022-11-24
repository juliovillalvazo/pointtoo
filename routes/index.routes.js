const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
    res.render('index', { user: req.session.currentUser });
});

router.get('/about', (req, res) => {
    res.render('about', { user: req.session.currentUser });
});

module.exports = router;
