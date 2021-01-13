const moongose = require('mongoose');
const Schema = moongose.Schema;

const facultySchema = moongose.Schema({
    name: {
        type: String,
        unique: true,
    },
    floor: [{
        type: Schema.Types.ObjectId,
        ref: 'Floors',
    }],
});

const FacultyModel = moongose.model('Faculties', facultySchema);
module.exports = FacultyModel;