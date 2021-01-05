require('../database');
const express = require('express');
const router = express.Router();

const iwtAuth = require('../../middlewares');

const UserController = require('../controller/user');

//LISTA URZYTKOWNIKOW W GRUPIE 
router.get('/:groupId', iwtAuth, UserController.getUsers);

module.exports = router;