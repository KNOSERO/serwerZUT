const UserModel = require('../model/user');
const jwt = require('jsonwebtoken');

const UserController = {

    /** TWORZENIE URZYTKOWNIKA */
    register: async (req, res, next) => {
        const user = new UserModel({
            email: req.body.email,
            name: req.body.name,
            surname: req.body.surname,
        });

        try {
            await UserModel.register(user, req.body.password);
            res.status(200).json({ status: 0 });
        }
        catch (err) {
            res.status(200).json({ status: -1 });
        }

    },

    /** WERYFIKACJA URZYTKOWNIKA */
    login: async (req, res, next) => {
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: 1200 });
        return res.send({ token });
    },

    /** DODAWANIE URZYTKOWNIKA DO GRUPY */
    updateGroup: async (req, res, next) => {
        await UserModel.findOneAndUpdate({
            _id: req.user._id
        }, {
            $addToSet: {
                groups: req.idGroup,
            }
        }).then(result => {
            res.status(200).json({
                status: 0,
            })
        })
    },

    /** POBIERANIE GRUP URZYTKOWNIKA */
    getGroups: async (req, res, next) => {
        await UserModel.findOne({ _id: req.user._id })
            .populate('groups')
            .then(result => {
                res.status(200).json({
                    groups: result.groups,
                });
            });
    },

    /** POBIERANIE URZYTKOWNIKÓW GRUPY */
    getUsers: async (req, res, next) => {
        await UserModel.find({
            groups: req.params.groupId,
            _id: {
                $ne: req.user._id,
            },
        }, '_id name surname')
            .then(result => {
                res.status(200).json(result);
            });
    },

    usersGroup: async (req, res, next) => {
        await UserModel.find({
            groups: req.body.groupID,
            _id: {
                $ne: req.user._id,
            },
        }, '_id')
            .then(result => {
                req.members = result;
                next();
            });
    },

};

module.exports = UserController;