const moongose = require('mongoose');
const Schema = moongose.Schema;

const hourSchema = moongose.Schema({
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Groups'
    },
    start: {
        type: Date,
    }, 
    end: {
        type: Date,
    },
    location: {
        department: {
            type: String,
        },
        room: {
            type: String,
        },
    },
}, {
    timestamps: true,
});

const HourModel = moongose.model('Hours', hourSchema);
module.exports = HourModel;