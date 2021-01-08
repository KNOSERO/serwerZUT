require('../database');
const express = require('express');
const router = express.Router();

const iwtAuth = require('../../middlewares');

const ChatControler = require('../controller/chat');
const ChatDataControler  = require('../controller/chatData');
const MessageControler = require('../controller/message');
const UserController = require('../controller/user');

//POBIERANIE CHATÓW
router.get('/', iwtAuth, ChatControler.all);

//WYSŁANIE WIADOMOŚCI NA CZAT PRYWATNY
router.post('/private', iwtAuth,
    MessageControler.add,
    ChatDataControler.addPrivate,
    ChatControler.addMeber,
    ChatControler.add);

//WYSŁANIE WIADOMOŚCI NA CZAT PUBLICZNY
router.post('/public', iwtAuth,
    MessageControler.add,
    ChatDataControler.addPublic,
    UserController.usersGroup,
    ChatControler.addGroup,
    ChatControler.add);

//EDYCJA WIADOMOŚCI
router.post('/message', iwtAuth,
    MessageControler.update);

//EDYCJA NAZWY
router.post('/name', iwtAuth,
    ChatControler.updateName);

//DODANIE DO GRUPOWEGO CZATU -
router.post('/group', iwtAuth,
    ChatDataControler.findGroupChat,
    ChatControler.add);

//POTWIERDZENIE PRZECZYTANIA -
router.post('/read', iwtAuth, 
    ChatControler.update);

module.exports = router;