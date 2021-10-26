const express = require('express');
const router = express.Router();

const { conceptsOnOffer } = require('../javascripts/utils.js');

router.get('/', (req, res) => {
    res.render('main', { conceptsOnOffer: conceptsOnOffer });
})

router.get('/contact-form', (req, res) => {
    res.render('contact-form', { conceptsOnOffer: conceptsOnOffer });
});

router.get('/thankyou-for-contacting', (req, res) => {
    res.render('thankyou-for-contacting', { conceptsOnOffer: conceptsOnOffer });
});
  
router.get('/standard-pages/executive-protection-services', (req, res) => {
    res.render('standard-pages/executive-protection-services');
});

router.get('/standard-pages/security-consultancy', (req, res) => {
    res.render('standard-pages/security-consultancy');
});

router.get('/standard-pages/security-training-courses', (req, res) => {
    res.render('standard-pages/security-training-courses');
});

router.get('/standard-pages/technical-surveillance', (req, res) => {
    res.render('standard-pages/technical-surveillance');
});

router.get('/standard-pages/security-management-services', (req, res) => {
    res.render('standard-pages/security-management-services');
});

router.get('/standard-pages/private-investigations', (req, res) => {
    res.render('standard-pages/private-investigations');
});

module.exports = router;
