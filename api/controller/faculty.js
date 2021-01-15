const FacultyModel = require("../model/faculty");
const FloorModel = require("../model/floor");
const fs = require('fs')

const FacultyControler = {

    add: async (req, res, next) => {

        const temp = await JSON.parse(fs.readFileSync("./api/json/faculty.json"))

        temp.faculty.forEach(async faculty => {
            await FacultyModel.findOneAndUpdate({
                name: faculty.name,
            }, {
                name: faculty.name,
                floor: [],
            }, {
                new: true,
                upsert: true,
            });


            faculty.floor.forEach(async floor => {

                const el = await FloorModel.findOneAndUpdate({
                    name: floor.name,
                }, floor, {
                    new: true,
                    upsert: true,
                });

                await FacultyModel.findOneAndUpdate({
                    name: faculty.name,
                }, {
                    $addToSet: {
                        floor: el._id,
                    }
                });
            });
        });
        res.status(200).json({
            status: 0,
        });
    },

    get: async (req, res, next) => {
        await FacultyModel.findOne({
            name: req.query.locName,
        }).populate({
            path: 'floor',
            match: { 'rooms.name': req.query.roomName }
        })
            .then(result => res.status(200).json({floor: result}))
            .catch(() => res.status(201).json(null));
    },
};

module.exports = FacultyControler;