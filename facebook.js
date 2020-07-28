const Auth = require('./config');
var FB = require('fb');

//var fb = new FB.Facebook(options);

FB.options({version: 'v2.4'});
var fb = FB.extend({appId: Auth.FacebookAuthentication.appId, appSecret: Auth.FacebookAuthentication.appSecret});

FB.setAccessToken(Auth.FacebookAuthentication.pageToken);
//FB.setAccessToken(Auth.FacebookAuthentication.accessToken);
var id = Auth.FacebookAuthentication.pageId;

function FacebookPost(req, callback) {
    //me/feed
    FB.api( id + '/feed', 'post', { message: req.message }, function (res) {
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
        }
        console.log('Post Id: ' + res.id);
    });
}

function FacebookDeletePost(post, callback){
    FB.api({id: post}, 'delete', function (res) {
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }
    console.log('Post was deleted');
    });
}

function FacebookPostImage(req, callback) {    
    //me/photos
    FB.api(id + '/photos', 'post', { source: req.img, caption: req.message}, function (res) {
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
        }
        console.log('Post Id: ' + res.post_id);
    });
    
}

module.exports = {FacebookPost, FacebookDeletePost, FacebookPostImage};