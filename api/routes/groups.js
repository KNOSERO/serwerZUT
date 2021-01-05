require('../database');
const express = require('express');
const router = express.Router();

const iwtAuth = require('../../middlewares');

const UserController = require('../controller/user');

//LISTA GRUP URZYTKOWNIKA
router.get('/', iwtAuth, UserController.getGroups);

module.exports = router;