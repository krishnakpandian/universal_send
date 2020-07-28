const Reddit = require('snoowrap');
const imgur = require('imgur');
const Auth = require('./config');

const R = new Reddit(Auth.RedditAuthentication);
imgur.setClientId(process.env.IMGUR_CLIENT_ID);

async function redditPost(req, callback) {
    if (req.image){
        req.text +=  ' ' + await createImgurLink(req.image);
    }
    var submission = await R.submitSelfpost(req);
    callback(submission);
}


async function createImgurLink(image) {
    var link = await imgur.uploadBase64(image)
    .then(function (json) {
        return json.data.link
    })
    .catch(function (err) {
        console.error(err.message);
    });

    return link;
}

async function deletePost(id, callback) {
    const success = await R.getSubmission(id).delete();
    callback(success);
}

module.exports = {redditPost, deletePost}