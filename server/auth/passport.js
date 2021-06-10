const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');

const handleAuthentication = (accessToken, refreshToken, profile, done) => {
    User.getOrCreate(profile, (err, user) => {
        return done(err, user);
    });
}

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_AUTH_CALLBACK
    }, handleAuthentication
));

passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_AUTH_CALLBACK
    }, handleAuthentication
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    done(null, id);
});

module.exports = passport;