const moongose = require('mongoose');
const Schema = moongose.Schema;

const chatSchema = moongose.Schema({
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'ChatDatas'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    name: {
        type: String,
        default: null,
    },
    lastRefersh: {
        type: Date,
        default: new Date(Date.now()),
    },
});

const ChatModel = moongose.model('Chats', chatSchema);
module.exports = ChatModel;