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
