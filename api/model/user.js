const moongose = require('mongoose');
const Schema = moongose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = moongose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    name: {
        type: String,
    },
    surname: {
        type: String,
    },
    groups: [{
        type: Schema.Types.ObjectId,
        ref: 'Groups'
    }],
});

userSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

const UserModel = moongose.model('Users', userSchema);
module.exports = UserModel;