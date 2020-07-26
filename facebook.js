const Auth = require('./config');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
const request = require('request-promise');

passport.use(new FacebookStrategy({
    clientID: Auth.FacebookAuthentication.appId,
    clientSecret: Auth.FacebookAuthentication.appSecret,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            if (err) { return done(err); }
            done(null, user);
            //return cb(err, user);
        });
    }
));

function FacebookPost(req, callback) {
    const id = Auth.FacebookAuthentication.pageId;
    const access_token = Auth.FacebookAuthentication.pageToken;

    const postText = {
        method: 'POST',
        uri: `https://graph.facebook.com/v7.0/${id}/feed`,
        qs: {
            access_token: access_token,
            message: req.message,
        }
    };
    request(postText).then(function (repos) {
        console.log('User has %d repos', repos.length);
    })
    .catch(function (err) {
        // API call failed...
        console.log(err)
    });
}

module.exports = {FacebookPost};