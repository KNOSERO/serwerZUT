const passport = require('passport');
const passportJWT = require('passport-jwt');
const UserModel = require('./model/user');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

async function verifyCallback(payload, done) {
    return UserModel.findOne({_id: payload.id})
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            return done(err);
        });
}

module.exports = function() {
    const config = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    };

    passport.use(UserModel.createStrategy());
    passport.use(new JWTStrategy(config, verifyCallback));
}
