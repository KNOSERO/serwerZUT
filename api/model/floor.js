const moongose = require('mongoose');

const floorSchema = moongose.Schema({
    name: {
        type: String,
        unique: true,
    },
    rooms: [{
        name: {
            type: String,
        },
        poz: [{
            x: {
                type: Number,
            },
            y: {
                type: Number,
            },
        }],
    }],
    poz: [{
        x: {
            type: Number,
        },
        y: {
            type: Number,
        },
    }]
});

const FloorModel = moongose.model('Floors', floorSchema);
module.exports = FloorModel;