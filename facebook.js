const Auth = require('./config');
var FB = require('fb');

//var fb = new FB.Facebook(options);

FB.options({version: 'v2.4'});
var fb = FB.extend({appId: Auth.FacebookAuthentication.appId, appSecret: Auth.FacebookAuthentication.appSecret});

function FacebookPost(req, callback) {
    FB.setAccessToken(Auth.FacebookAuthentication.pageToken);
    
    var id = Auth.FacebookAuthentication.pageId;

    FB.api( id + '/feed', 'post', { message: req.message }, function (res) {
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
        }
        console.log('Post Id: ' + res.id);
    });
}

function FacebookDeletePost(req, callback){
    FB.setAccessToken(Auth.FacebookAuthentication.pageToken);
    
    FB.api(req.id, 'delete', function (res) {
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }
    console.log('Post was deleted');
    });
}

module.exports = {FacebookPost, FacebookDeletePost};