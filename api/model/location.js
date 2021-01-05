const { Decimal128 } = require('mongodb');
const moongose = require('mongoose');
const Schema = moongose.Schema;

const locationSchema = moongose.Schema({
    name: {
        type: String,
        unique: true,
    },
    address: {
        type: String,
    },
    fullname: {
        type: String,
    },
    where: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        },
    },
});

const LocationModel = moongose.model('Locations', locationSchema);
module.exports = LocationModel;