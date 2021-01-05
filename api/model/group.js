const moongose = require('mongoose');

const groupSchema = moongose.Schema({
    professor: {
        type: String,
    },
    group: {
        type: String,
    },
    name: {
        type: String,
    },
    year: {
        type: String,
    },
    form: {
        type: String,
    },
},  {
    timestamps: true,
});

const GroupModel = moongose.model('Groups', groupSchema);
module.exports = GroupModel;