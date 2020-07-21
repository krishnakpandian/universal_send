const Reddit = require('snoowrap');
const Auth = require('./config');

const R = new Reddit(Auth.RedditAuthentication);

function redditPost(req, callback) {
    R.submitSelfpost(req);
}

module.exports = {redditPost}