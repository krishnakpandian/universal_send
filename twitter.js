const Twit = require('Twit');
const Auth = require('./config');
var T = new Twit(Auth.TwitterAuthentication);

function TwitterPost(req, callback) {
    T.post('statuses/update', {status: req.message}, (err) => {
        if (err){
            return callback({
                message: err.message,
                code: err.code
            });
        }
        else {
            return callback({
                message: 'Message Sent from Twitter API',
                code: 200
            });
        }
    })
    if (callback.code === 200) {
        // return Twitter.getRecentTweet({count: 1, include_rts: false});
    }
    return null
}

async function getRecentTweet(req, callback) {  
    await T.get('statuses/user_timeline', req, (data, err) => { //Fix callback to print error and return data
        if (err){
            //console.log(err);
        }
        else {
            console.log("Retrived");
            return callback(data);
        }
    });
    console.log(callback);
    return callback;
}

function TwitterDeletePost(req, callback) {
    T.post('statuses/destroy/:id',  { id: req.body.id }, (err, data, response) => {
        if (err) {
            console.log(err);
            return callback({
                message: err.message,
                code: err.code
            });
        }
        else {
            return callback({
                message: 'Message Deleted With the Twitter API',
                code: 200
            });
        }
    })
}

function TwitterPostImage(req, callback) {

}

module.exports = {TwitterPost, TwitterDeletePost, TwitterPostImage, getRecentTweet}