const Twit = require('Twit');
const Auth = require('./config');
var T = new Twit(Auth.TwitterAuthentication);

function TwitterPost(req, callback) {
    T.post('statuses/update', {status: req.message}, (err) => {
        if (err){
            //console.log(err.message);
            //console.log(err.code);
            return callback({
                message: err.message,
                code: err.code
            });
        }
        else {
            //console.log('Message Sent from Twitter API');
            //console.log(200);
            return callback({
                message: 'Message Sent from Twitter API',
                code: 200
            });
        }
    })
}

function getRecentTweet(req,callback){
    
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

module.exports = {TwitterPost, TwitterDeletePost, TwitterPostImage}