const router = require('express').Router();

router.get('/country', (req, res) => {
    res.render('countries/country');
});

module.exports = router;
