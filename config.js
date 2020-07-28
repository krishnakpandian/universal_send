require('dotenv').config();

const TwitterAuthentication = {
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_SECRET,
}

const FacebookAuthentication = {
    appId: process.env.FACEBOOK_APP_ID,
    accessToken:process.env.FACEBOOK_ACCESS_TOKEN,
    pageId: process.env.FACEBOOK_PAGE_ID,
    pageToken: process.env.FACEBOOK_PAGE_TOKEN,
    appSecret: process.env.FACEBOOK_APP_SECRET,
}

const RedditAuthentication = {
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    userAgent: process.env.REDDIT_USER_AGENT,
    username: process.env.REDDIT_USERNAME,
    password: process.env.REDDIT_PASSWORD
}

module.exports = {TwitterAuthentication, FacebookAuthentication, RedditAuthentication}