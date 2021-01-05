const MessageModel = require('../model/message');   
const mongoose = require('mongoose');

const MessageControler = {
    
    /** TWORZENIE WIADOMOSCI */
    add: async (req, res, next) => {
        const id = mongoose.Types.ObjectId();
        const message = new MessageModel({
            _id: id,
            autor: req.user._id,
            context: req.body.context,
        });
        await message.save();
        req.idMassage = id;
        next();
    },

    /** EDYCJA WIADOMOSCI */
    update: async (req, res, next) => {
        await MessageModel.findOneAndUpdate({
            _id: req.body.id,
        },{
            context: req.body.context,
        });

        res.status(200).json({
            status: 0,
        });
    },
    
}

module.exports = MessageControler;