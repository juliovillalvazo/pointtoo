const router = require('express').Router();

router.get('/country', (req, res) => {
    res.render('countries/country');
});

router.get("/create-country", (req, res) => {
    res.render('countries/createcountry')
})

module.exports = router;
