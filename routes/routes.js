const express = require('express');
const router = express.Router();
// const fs = require('fs');

router.get('/', (req, res) => {
    res.render('main');
})

router.get('/contact-form', (req, res) => {
    res.render('contact-form');
});

router.get('/thankyou-for-contacting', (req, res) => {
    res.render('thankyou-for-contacting');
});

router.get('/other', (req, res) => {
    res.render('other');
});
  
router.get('/executive-protection-services', (req, res) => {
    res.render('executive-protection-services');
});

module.exports = router;
