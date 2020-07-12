require('dotenv').config();

const TwitterAuthentication = {
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_SECRET,
}

const FacebookAuthentication = {

}

const RedditAuthentication = {

}

module.exports = {TwitterAuthentication, FacebookAuthentication, RedditAuthentication}