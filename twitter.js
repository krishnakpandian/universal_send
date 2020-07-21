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
    var b64content = fs.readFileSync('/path/to/img', { encoding: 'base64' })


    T.post('media/upload', { media_data: b64content }, function (err, data, response) {
      var mediaIdStr = data.media_id_string
      var altText = "Small flowers in a planter on a sunny balcony, blossoming."
      var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
    
      T.post('media/metadata/create', meta_params, function (err, data, response) {
        if (!err) {
          // now we can reference the media and post a tweet (media will attach to the tweet)
          var params = { status: req.params, media_ids: [mediaIdStr] }
    
          T.post('statuses/update', params, function (err, data, response) {
            console.log(data)
          })
        }
      })
    })
}

module.exports = {TwitterPost, TwitterDeletePost, TwitterPostImage}