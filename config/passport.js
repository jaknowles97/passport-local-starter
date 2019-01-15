const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = function(passport) {
    // serialize user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })
    // and vise-versa
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user)
        })
    })

    //----------------- LOCAL LOGIN -------------------------------------
    passport.use('local-login', new LocalStrategy({
        // setting custom user & pass names
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallack: true 
    },
    function(email, password, done) {
        User.findOne({ 'local.email': email }, function(err, user) {
            if (err)  return done(err);
            // check to see if email is not already in use
            if (!user) return done(null, false, { message: 'user not found' })
            // if the password is incorrect
            if(!user.validPassword(password)) return done(null, false, {
                message: 'incorrect email or password'
            })
            // start user session
            return done(null, user);
        })
    }))
}