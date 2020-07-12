const Twit = require('Twit');
const Auth = require('./config');
var T = new Twit(Auth.TwitterAuthentication);

function TwitterPost(req, callback) {
    T.post('statuses/update', {status: req.message}, (err) => {
        if (err){
            console.log(err.message);
            console.log(err.code);
            return callback({
                message: err.message,
                code: err.code
            });
        }
        else {
            console.log('Message Sent from Twitter API');
            console.log(200);
            return callback({
                message: 'Message Sent from Twitter API',
                code: 200
            });
        }
    })
}


module.exports = {TwitterPost}