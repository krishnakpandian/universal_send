const Twitter = require('./twitter.js');
const Reddit = require('./reddit.js');
const Facebook = require('./facebook.js');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { TwitterPost } = require('./twitter.js');
const app = express();
const PORT = process.env.port || 3000;


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var alphaNumeric = '^[a-zA-Z0-9 .\'?!,-]*$';
const postLength = 1000;
const dataLength = 100;

function chunkString(str, len) {
    const size = Math.ceil(str.length / len)
    const r = Array(size)
    let offset = 0

    for (let i = 0; i < size; i++) {
        r[i] = str.substr(offset, len)
        offset += len
    }
    arr = [];
    for (let j = 0; j < r.length; j++) {
        if (j == 0) {
            arr.push({ text: r[j], options: { media_data: null } });
        }
        arr.push({ text: r[j] });
    }
    return arr
}



/*
    {
        message: "",
        imagePathway: ""
        metaParams?: {
            { 
                alt_text: { text: altText } }
        }
    }
*/
app.post('/twitter', (req, res) => {
    if (!req || !req.body || !req.body.message) {
        res.send({
            message: 'Invalid Body Data',
            code: 400
        }).status(400);
    } else if (req.body.message.length > postLength || (req.body.imagePathway && req.body.imagePathway.length > dataLength)) {
        res.send({
            message: 'Invalid Body Data',
            code: 400
        }).status(400);
    } else if (req.body.message.length > 280) { //format req
        var b64content;
        arr = chunkString(req.body.message, 275);
        if (req.body.imagePathway) {
            try {
                b64content = fs.readFileSync(req.body.imagePathway, { encoding: 'base64' });
            } catch (error) {
                console.log(error);
            }
        }
        arr[0].options.media_data = b64content;

        Twitter.TwitterThread(arr, (response) => {
            res.send(response).status(response.code);
        });
    } else if (!req.body.imagePathway) {
        Twitter.TwitterPost({ message: req.body.message }, (response) => {
            console.log(response);
            res.send(response).status(response.code);
        });
    } else {
        try {
            var b64content = fs.readFileSync(req.body.imagePathway, { encoding: 'base64' });
            Twitter.TwitterPostImage({ img: b64content, message: req.body.message, metaParams: req.body.metaParams }, (response) => {
                res.send(response).status(response.code);
            });
        } catch (error) {
            res.send({
                message: 'Invalid Image Pathway',
                code: 400
            }).status(400);
        }
    }
});

/*
    {
        message: "",
        imagePathway?: ""
    }
*/
app.post('/facebook', (req, res) => {
    if (!req || !req.body || !req.body.message) {
        res.send({
            message: 'Invalid Body Data',
            code: 400
        }).status(400)
    }
    if (req.body.message.length > postLength) { //max char in facebook post
        res.send({
            message: 'Post is too long',
            code: 400
        }).status(400)
        console.log("Post is too long");
        return;
    } else if (!req.body.imagePathway) {
        Facebook.FacebookPost({ message: req.body.message }, (response) => {
            console.log(response);
            res.send(response)
        });
    } else {
        var b64content = null;
        try {
            b64content = fs.createReadStream(req.body.imagePathway);
        } catch (error) {
            res.send({
                message: 'Invalid Image',
                code: 400
            }).status(400)
            console.log("Invalid Image");
            return;
        }
        Facebook.FacebookPostImage({ img: b64content, message: req.body.message }, (response) => {
            res.send(response).status(response.code);
        })
    }


});

/*
    {
        message: "",
        title: "",
        imagePathway?: "",
        subreddit: ""

    }
*/
app.post('/reddit', (req, res) => {
    if (!req || !req.body || !req.body.message || !req.body.title || !req.body.subreddit) {
        res.send({
            message: 'Invalid Body Data',
            code: 400
        }).status(400)
    }
    console.log(req.body.imagePathway);
    var b64content = null;
    if (req.body.imagePathway != null) {
        try {
            b64content = fs.readFileSync(req.body.imagePathway, { encoding: 'base64' });
        } catch (error) {
            console.log("Invalid Image");
        }
    }
    const submission = Reddit.redditPost({
        subredditName: req.body.subreddit, // Test in testingground4bots
        title: req.body.title,
        text: req.body.message,
        image: b64content
    }, (response) => {
        if (response.Submission != null) {
            res.send({
                message: 'Successful Post to Reddit API',
                code: 201,
                id: response.name
            }).status(201);
        } else {
            res.send({
                message: 'Unable to Post to Reddit API',
                code: 400
            }).status(400)
        }
    })

});


/*
    {
        platforms: {
            twitter: boolean,
            facebook: boolean,
            reddit: boolean
        }
        fields: {
            subreddit: ""
            title: ""
        }
        message: "",
        imagePathway?: ""
    }
*/
app.post('/all', (req, res) => {
    //console.log(req.body);
    if (!req || !req.body || !req.body.message || req.body.message.length > postLength || (req.body.imagePathway && req.body.imagePathway.length > dataLength)) {
        res.send({
            message: 'Invalid Body Data',
            code: 400
        })
    }
    const message = req.body.message;
    var b64content = null;
    try {
        b64content = fs.readFileSync(req.body.imagePathway, { encoding: 'base64' });
    } catch (error) {
        console.log("Invalid Image");
    }
    let responses = [];
    if (req.body.platforms.twitter) {
        if (req.body.message.length > 280){
            arr = chunkString(message);
            arr[0].options.media_data = b64content;
            Twitter.TwitterThread(arr, (response) => {
                console.log(response);
            });
        }
        else {
            if (b64content){
                Twitter.TwitterPostImage({img: b64content, message: req.body.message}, (response) => {
                    console.log(response);
                });
            }
            else {
                Twitter.TwitterPost({message: req.body.message}, (response) => {
                    console.log(response);
                });
            }
        }
    }
    if (req.body.platforms.facebook) {
        if (b64content) {
            Facebook.FacebookPostImage({ img: b64content, message: req.body.message }, (response) => {
                if (response.code != 201) {
                    return res.send(response).status(response.code);
                }
            })
        }
        else {
            Facebook.FacebookPost({ message: req.body.message }, (response) => {
                console.log(response)
            });
        }
    }
    if (req.body.platforms.reddit) {
        const reddit = Reddit.redditPost({
            subredditName: req.body.fields.subreddit, 
            title: req.body.fields.title,
            text: req.body.message,
            image: b64content
        }, (response) => {
            if (response.code != 201) {
                console.log(response)
            }
        })
    }
    res.send({
        code: 201,
        message: "Successful Post",
    }).status(201);
});


/*
    {
        id: ""
    }
*/
app.delete('/twitter', (req, res) => {
    if (!req || !req.body || !req.body.id || !req.body.id.match(alphaNumeric) || req.body.id.length > dataLength) {
        res.send({
            message: 'Invalid Body Data',
            code: 400
        }).status(400)
    } else {
        Twitter.TwitterDeletePost(req.body.id, (response) => {
            console.log(response);
            res.send(response).status(response.code)
        });
    }
});

/*
    {
        id: ""
    }
*/
app.delete('/facebook', (req, res) => {
    if (!req || !req.body || !req.body.id || !req.body.id.match(alphaNumeric) || req.body.id.length > dataLength) {
        res.send({
            message: 'Invalid Body Data',
            code: 400
        }).status(400)
    } else {
        Facebook.FacebookDeletePost(req.body.id, (response) => {
            console.log(response);
            res.send(response).status(response.code)
        });
    }
});

/*
    {
        id: ""
    }
*/
app.delete('/reddit', (req, res) => {
    if (!req || !req.body || !req.body.id || !req.body.id.match(alphaNumeric) || req.body.id.length > dataLength) {
        res.send({
            message: 'Invalid Body Data',
            code: 400
        }).status(400)
    }
    Reddit.deletePost(req.body.id, (response) => {
        console.log(response);
        res.send({
            message: 'Successful Delete with Reddit API',
            code: 200
        }).status(200)
    });

});


app.listen(PORT, function() {
    console.log('Server Running on PORT ' + PORT);
});