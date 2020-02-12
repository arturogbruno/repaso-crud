const express = require('express');
const router = express.Router();
const Park = require('../models/park.model');

// New - Show form to add a new park
router.get('/new', (req, res, next) => {
    res.render('parks/new-park');
});

// Create - Add new park to the DB
router.post('/new', (req, res, next) => {
    const {name, description} = req.body;
    const active = true;
    const newPark = new Park({name, description, active});
    newPark.save()
    .then(() => res.render('parks/new-park'))
    .catch(() => res.render('parks/new-park'));
});

module.exports = router