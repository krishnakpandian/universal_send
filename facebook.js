const Auth = require('./config');
var FB = require('fb');

//var fb = new FB.Facebook(options);

FB.options({version: 'v2.4'});
var fb = FB.extend({appId: Auth.FacebookAuthentication.appId, appSecret: Auth.FacebookAuthentication.appSecret});

function FacebookPost(req, callback) {
    FB.setAccessToken(Auth.FacebookAuthentication.accessToken);
 
    var body = 'My first post using facebook-node-sdk';
    FB.api('me/feed', 'post', { message: body }, function (res) {
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
        }
        console.log('Post Id: ' + res.id);
    });
}

module.exports = {FacebookPost};