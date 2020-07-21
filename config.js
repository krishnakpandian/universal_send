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
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    userAgent: process.env.REDDIT_USER_AGENT,
    username: process.env.REDDIT_USERNAME,
    password: process.env.REDDIT_PASSWORD
}

module.exports = {TwitterAuthentication, FacebookAuthentication, RedditAuthentication}