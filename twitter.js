const Twit = require('Twit');
const Auth = require('./config');
const e = require('express');

var T = new Twit(Auth.TwitterAuthentication);

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
                id: data.id
            });
        }
    })
}


function TwitterDeletePost(req, callback) {
    T.post('statuses/destroy/:id', req, (err, data, response) => {
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

module.exports = { TwitterPost, TwitterDeletePost, TwitterPostImage }