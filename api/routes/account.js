require('../database');
const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');
const passport = require('passport');

//LOGOWANIE
router.post('/login', passport.authenticate('local', {session: false }), UserController.login);

//REJESTRACJA
router.post('/register', UserController.register);

module.exports = router;