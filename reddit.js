const Reddit = require('snoowrap');
const Auth = require('./config');

const R = new Reddit(Auth.RedditAuthentication);

function redditPost(req) {
    var submission = R.submitSelfpost(req);
    return submission
}

module.exports = {redditPost}