require('../database');
const express = require('express');
const router = express.Router();

const LocationController = require('../controller/location');

//POBRANIE LOKALIZACJI
router.get('/',
    LocationController.get);

//DODANIE LOKALIZACJI
router.post('/',
    LocationController.add);

module.exports = router;