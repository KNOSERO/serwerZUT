const LocationModel = require('../model/location');

const LocationController = {

    add: async (req, res, next) => {

        const location = [
            { name: 'WI WI1', fullName: 'Wydział Informatyki ZUT - budynek 1', address: 'Żołnierska 49, 71-210 Szczecin', where: { lat: 53.446963, lng: 14.4922442 } },
            { name: 'WI WI2', fullName: 'Wydział Informatyki ZUT - budynek 2', address: 'Żołnierska 52, 71-210 Szczecin', where: { lat: 53.4484294, lng: 14.4911316 } },
        ]

        location.map(async (el) => {
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