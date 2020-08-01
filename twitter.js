const Twit = require('Twit');
const { TwitThread } = require('twit-thread');
const Auth = require('./config');

var T = new Twit(Auth.TwitterAuthentication);
var thread = new TwitThread(Auth.TwitterAuthentication);

function TwitterPost(req, callback) {
    T.post('statuses/update', { status: req.message }, (err, data, response) => {
        if (err) {
            return callback({
                message: err.message,
                code: err.code
            });
        } else {
            return callback({
                message: 'Message Sent from Twitter API',
                code: 201,
                id: data.id,
                id_str: data.id_str
            });
        }
    })
}

async function TwitterThread(tweetData, callback) {
    if (tweetData[0].options.media_data != null) {
        var data;
        try {
            data = await thread.tweetThread(tweetData);
        } catch (error) {
            return callback({
                message: "Failed to Post to Thread",
                code: 400
            });
        }
        console.log(data);
        if (data && data[0]) {
            return callback({
                message: 'Message Sent from Twitter API',
                code: 201,
                id: data[0].id,
                id_str: data[0].id_str
            })
        } else {
            return callback({
                message: "Failed to Post to Thread",
                code: 400
            });
        }
    } else {
        var data;
        try {
            data = await thread.tweetThread(tweetData);
        } catch (error) {
            return callback({
                message: "Failed to Post to Thread",
                code: 400
            });
        }
        if (data && data[0]) {
            return callback({
                message: 'Message Sent from Twitter API',
                code: 201,
                id: data[0].id,
                id_str: data[0].id_str
            })
        } else {
            return callback({
                message: "Failed to Post to Thread",
                code: 400
            });
        }
    }

}

function TwitterDeletePost(tweet, callback) {
    T.post('statuses/destroy/:id', { id: tweet }, (err, data, response) => {
        if (err) {
            return callback({
                message: err.message,
                code: err.code
            });
        } else {
            return callback({
                message: 'Message Deleted With the Twitter API',
                code: 200
            });
        }
    })
}

function TwitterPostImage(req, callback) {
    T.post('media/upload', { media_data: req.img }, function(err, data, response) {
        var mediaIdStr = data.media_id_string;
        metaParams = {
            media_id: mediaIdStr,
            alt_text: req.metaParams.alt_text
        }
        T.post('media/metadata/create', metaParams, (err, data, response) => {
            if (!err) {
                var params = { status: req.message, media_ids: [mediaIdStr] }

                T.post('statuses/update', params, (err, data, response) => {
                    if (err) {
                        callback({
                            message: err.message,
                            code: err.code
                        })
                    } else {
                        callback({
                            message: 'Message Sent from Twitter API',
                            code: 201,
                            id: data.id
                        });
                    }
                })
            } else {
                callback({
                    message: err.message,
                    code: err.code
                });
            }
        })
    })
}


module.exports = { TwitterPost, TwitterDeletePost, TwitterPostImage, TwitterThread }