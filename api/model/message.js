const moongose = require('mongoose');
const Schema = moongose.Schema;

const messageSchema = moongose.Schema({
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    context: {
        type: String,
    },
},{
    timestamps: true,
});

const MessageModel = moongose.model('Messages', messageSchema);
module.exports = MessageModel;