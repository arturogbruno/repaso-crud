const express = require('express');
const router = express.Router();
const Park = require('../models/park.model');
const Coaster =require('../models/coaster.model');

// New - Show form to add a new coaster
router.get('/new', (req, res, next) => {
    Park.find()
    .then(allParks => res.render('coasters/new-coaster', {allParks}))
    .catch(() => res.redirect('/coasters'));
});

// Create - Add new coaster to the DB
router.post('/new', (req, res, next) => {
    const {name, description, inversions, length} = req.body;
    const active = true;
    const park = req.body.parkId;
    const newCoaster = new Coaster({name, description, inversions, length, active, park});
    newCoaster.save()
    .then(() => res.redirect('/coasters'))
    .catch(() => res.redirect('/coasters/new'));
});

// Index - Show all coasters
router.get('/', (req, res, next) => {
    Coaster.find()
    .populate('park')
    .then(allCoasters => res.render('coasters/coasters-index', {allCoasters}))
    .catch(() => res.redirect('/'));
});

// Show - Show details about specific coaster
router.get('/:id', (req, res, next) => {
    Coaster.findById(req.params.id)
    .populate('park')
    .then(coaster => res.render('coasters/coaster-details', coaster))
    .catch(() => res.redirect('/coasters'));
});

// Delete - Delete coaster from DB
router.post('/delete', (req, res, next) => {
    Coaster.findByIdAndDelete(req.query.id)
    .then(() => res.redirect('/coasters'))
    .catch(() => res.redirect('/'));
});


module.exports = router