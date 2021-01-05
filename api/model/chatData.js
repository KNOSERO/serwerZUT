const moongose = require('mongoose');
const Schema = moongose.Schema;

const chatDataSchema = moongose.Schema({
    message: [{
        type: Schema.Types.ObjectId,
        ref: 'Messages',
    }],
    private: {
        type: Boolean,
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'Users',
    }],
    group: [{
        type: Schema.Types.ObjectId,
        ref: 'Groups',
    }],
}, {
    timestamps: true,
});

const ChatDataModel = moongose.model('ChatDatas', chatDataSchema);
module.exports = ChatDataModel;