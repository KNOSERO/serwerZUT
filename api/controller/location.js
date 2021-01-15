const LocationModel = require('../model/location');
const fs = require('fs')

const LocationController = {

    add: async (req, res, next) => {

        const location = await JSON.parse(fs.readFileSync("./api/json/faculty.json"))

        location.location.map(async (el) => {
            await LocationModel.findOneAndUpdate({
                name: el.name,
            }, el, {
                new: true,
                upsert: true,
            });
        });

        res.status(200).json({
            status: 0,
        });
    },

    get: async (req, res, next) => {
        const temp = await LocationModel.findOne({
            name: req.params.name
        });
        res.status(200).json(temp);
    },

}

module.exports = LocationController;