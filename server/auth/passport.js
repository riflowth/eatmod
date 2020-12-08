const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECERT,
        callbackURL: 'http://localhost:8080/auth/google/callback'
    },
    function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        done(null, profile);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(id, done) {
    done(null, id);
});

module.exports = passport;