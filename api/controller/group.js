const GroupModel = require('../model/group');

const GroupController = {

    /** TWORZENIE GROUP */
    create: async (req, res, next) => {
        
        const dateParase = (day) => {
            if(parseInt(`${day[4]}${day[5]}`) < 10)
                return parseInt(`${day[0]}${day[1]}${day[2]}${day[3]}`) - 1;
            return parseInt(`${day[0]}${day[1]}${day[2]}${day[3]}`);
        };

        const data = dateParase(req.body.plan.dataZajec);

        const result = await GroupModel.findOneAndUpdate({
            professor: req.body.plan.prowadzacy,
            group: req.body.plan.grupa,
            name:  req.body.plan.przedmiot,
            year:  data,
            form:  req.body.plan.formaZajec,
        },
        {
            professor: req.body.plan.prowadzacy,
            group: req.body.plan.grupa,
            name:  req.body.plan.przedmiot,
            year:  data,
            form:  req.body.plan.formaZajec,
        },{
            new: true,
            upsert: true,
        });
        
        req.idGroup = result._id;
        next();
    }
}

module.exports = GroupController;