const ChatModel = require('../model/chat');

const ChatControler = {

    /** DODAWANIE URZYTKOWNIKA DO CHAT */
    add: async (req, res, next) => {
        const temp = await ChatModel.findOneAndUpdate({
            user: req.user._id,
            chat: req.chatID,
        }, {
            user: req.user._id,
            chat: req.chatID,
            lastRefersh: new Date(Date.now()),
        }, {
            new: true,
            upsert: true,
        });
        res.status(200).json({
            id: temp._id,
        });
    },

    /** DODAWANIE INNEGO URZYTKOWNIKA DO CZATU */
    addMeber: async (req, res, next) => {
        await ChatModel.findOneAndUpdate({
            user: req.body.memberID,
            chat: req.chatID,
        }, {
            user: req.body.memberID,
            chat: req.chatID,
        }, {
            new: true,
            upsert: true,
        });
        next();
    },

    /** DODAWANIE GRUPY */
    addGroup: async (req, res, next) => {
        console.log(req.members)
        req.members.forEach(async id => {
            await ChatModel.findOneAndUpdate({
                user: id,
                chat: req.chatID,
            }, {
                user: id,
                chat: req.chatID,
            }, {
                new: true,
                upsert: true,
            });
        });
        next();
    },

    /** AKTUALIZACJA NAZWY */
    updateName: async (req, res, next) => {
        await ChatModel.findOneAndUpdate({
            _id: req.body.id,
        }, {
            name: req.body.name,
        });
        res.status(200).json({
            status: 0,
        })
    },

    /** AKTUALIZACJA NAZWY */
    update: async (req, res, next) => {
        await ChatModel.findOneAndUpdate({
            _id: req.body.id,
        }, {
            lastRefersh: new Date(Date.now()),
        });
        res.status(200).json({
            status: 0,
        })
    },

    /** RETURN CZAŁEGO CZATU */
    all: async (req, res, next) => {
        await ChatModel.find({
            user: req.user._id
        })
            .populate({
                path: 'chat',
                populate: [{
                    path: 'message',
                    populate: {
                        path: 'autor',
                        select: '_id name surname'
                    }
                }, {
                    path: 'members',
                    match: {
                        _id: {
                            $ne: req.user._id,
                        },
                    },
                    select: '_id name surname',
                }, {
                    path: 'group',
                    select: '_id professor group name year form',
                }]
            })
            .then(result => {
                res.status(200).json({
                    chats: result,
                })
            })
            .catch(err => {
                res.status(400).send(err);
            });
    },
}

module.exports = ChatControler;