const HourModel = require('../model/hour');
const moment = require('moment-timezone');

const HourController = {
    
    /** TWORZENIE GODZINY ZAJĘĆ */
    create: async (req, res, next) => {

        /** TRASFORMOWANIE DANYCH NA DATE 
         * 
         * @param {string} day 
         * @param {string} hour 
        */
        const mdate = (day, hour) => {
            return moment(new Date(`${day[0]}${day[1]}${day[2]}${day[3]}`,
                            parseInt(`${day[4]}${day[5]}`) - 1, `${day[6]}${day[7]}`,
                            parseInt(`${hour[0]}${hour[1]}`), `${hour[3]}${hour[4]}`, 00), 'Europe/Warsaw')
                            .format()
        };

        const start = mdate(req.body.plan.dataZajec, req.body.plan.godzOd);
        const end = mdate(req.body.plan.dataZajec, req.body.plan.godzDo);

        /** TRASFORMOWANIE LOKALIZACJI
         * 
         * @param {String} str STRING Z INFORMACJĄ NA KTÓRYM WYDZIALE I SALI
         */
        const location = (str) => {
            const temp = str.split('-');
            return({
                department: temp[0],
                room: temp[1],
            });
        };

        await HourModel.findOneAndUpdate({
            group: req.idGroup,
            start: start,
            end: end,
            location: location(req.body.plan.sala),
        },{
            group: req.idGroup,
            start: start,
            end: end,
            location: location(req.body.plan.sala),
        },{
            new: true,
            upsert: true,
        });

        next();
    },
}

module.exports = HourController;