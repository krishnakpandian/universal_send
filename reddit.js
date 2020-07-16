const Reddit = require('snoowrap');
const Auth = require('./config');

const R = new snoowrap(Auth.RedditAuthentication);

function redditPost(req, callback) {
    r.getSubreddit(req.subreddit).submitSelfpost(req.post).assignFlair(req.flair);
}