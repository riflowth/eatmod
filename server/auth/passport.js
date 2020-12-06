const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy();

passport.use(new GoogleStrategy({
        consumerKey: process.env.GOOGLE_CONSUMER_KEY,
        consumerSecert: process.env.GOOGLE_CONSUMER_SECERT,
        callbackURL: 'localhost:8080'
    },
    function (token, tokenSecret, profile, done) {
        console.log(profile);
        done(null, rofile);
    }
));

module.exports = passport;