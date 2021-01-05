require('../database');
const express = require('express');
const router = express.Router()

const iwtAuth = require('../../middlewares');

const HourController = require('../controller/hour');
const CalendarControler = require('../controller/calendar');
const GroupController = require('../controller/group');
const UserControiller = require('../controller/user');

//POBIERANIE KALENDARZA 
router.get('/', iwtAuth, CalendarControler.return);

//TWORZENIE KALENDARZA
router.post('/', iwtAuth, GroupController.create, HourController.create, UserControiller.updateGroup);

module.exports = router;