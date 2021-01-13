require('../database');
const express = require('express');
const FacultyControler = require('../controller/faculty');
const router = express.Router();

const LocationController = require('../controller/location');

router.get('/details', 
    FacultyControler.get);

router.post('/details', 
    FacultyControler.add);

//POBRANIE LOKALIZACJI
router.get('/:name',
    LocationController.get);

//DODANIE LOKALIZACJI
router.post('/',
    LocationController.add);

module.exports = router;