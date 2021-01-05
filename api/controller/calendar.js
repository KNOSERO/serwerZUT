const HourModel = require('../model/hour');

const CalendarController = {

    /** ZWRACA KALENDARZ */
    return: async(req, res, next) => {
        await HourModel
        .find({
            group: {
                $in: req.user.groups,
            }
        })
        .populate('group')
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    }
}

module.exports = CalendarController;