const ChatDataModel = require('../model/chatData');
const mongoose = require('mongoose');


const ChatDataControler = {

    /** DODANIE PRYWATNEGO CZATU */
    addPrivate: async (req, res, next) => {
        ChatDataModel.findOneAndUpdate({
            members: { 
                $all: [
                    { $elemMatch: { $eq: mongoose.Types.ObjectId(req.user._id)}},
                    { $elemMatch: { $eq: mongoose.Types.ObjectId(req.body.memberID)}},
                ]
            },
        }, {
            private: true,
            members: [
                mongoose.Types.ObjectId(req.user._id),
                mongoose.Types.ObjectId(req.body.memberID)
            ],
            $addToSet: {
                message: req.idMassage,
            },
        }, {
            new: true,
            upsert: true,
        }).then(result => {
            req.chatID = result._id;
            next();
        });
    },

    /** DODANIE PUBLICZNEGO CZATU */
    addPublic: async (req, res, next) => {
        console.log(req.body.groupID);
        ChatDataModel.findOneAndUpdate({
            group: {
                $all: [{
                    $elemMatch: {
                        $eq: mongoose.Types.ObjectId(req.body.groupID)
                    }
                }]
            }
        }, {
            private: false,
            members: [],
            group: mongoose.Types.ObjectId(req.body.groupID),
            $addToSet: {
                message: req.idMassage,
            },
        }, {
            new: true,
            upsert: true,
        }).then(result => {
            req.chatID = result._id;
            next();
        });
    },

    /** POZYSKIWANIE ID CHAT GRUPY */
    findGroupChat: async (req, res, next) => {
        const temp = await ChatDataModel.findOne({
            group: req.body.groupID,
        });

        if (temp) {
            req.chatID = temp._id;
            next();
        }
        res.status(200).json({
            status: -1,
        });
    },
}

module.exports = ChatDataControler;