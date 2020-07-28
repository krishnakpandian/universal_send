const Twitter = require('./twitter.js');
const Reddit = require('./reddit.js');
const Facebook = require('./facebook.js');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = process.env.port || 3000;


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var alphaNumeric = '^[a-zA-Z0-9 .\'?!,-]*$';
const postLength = 1000;
const dataLength = 100;

function wordCounter(input) {
    var newInput = input;
    if (input != null) {
        newInput = input.trim()
    }

    var words = newInput ? newInput.split(/\s+/) : [];
    var wordCount = words ? words.length : 0;
    return words
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
    } else if (req.body.message.length > postLength || req.body.imagePathway.length > dataLength || !req.body.imagePathway.match(alphaNumeric)) {
        res.send({
            message: 'Invalid Body Data',
            code: 400
        }).status(400);
    } else if (!req.body.imagePathway) {
        if (req.body.message.length > 280) {
            arr = [];
            arr.push()
            Twitter.TwitterPost({ message: req.body.message.slice(0, 275) }, (response) => {
                if (response.code === 201) {
                    Twitter.TwitterReply({ message: req.body.message, id_str: response.id_str }, )
                }
                elif(response.code === 201)
            });
        } else {
            Twitter.TwitterPost({ message: req.body.message }, (response) => {
                console.log(response);
                res.send(response).status(response.code);
            });
        }
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
    } else if (!req.body.imagePathway) {
        Facebook.FacebookPost({ message: req.body.message }, (response) => {
            console.log(response);
            res.send(response)
        });
    }
    else {
        var b64content = null;
        try {
            b64content = fs.createReadStream(req.body.imagePathway);
        }
        catch (error){
            console.log("Invalid Image");
            return;
        }
        Facebook.FacebookPostImage({img: b64content, message: req.body.message}, (response) => {
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
        title: "",
        imagePathway?: ""
    }
*/
app.post('/all', (req, res) => {
    if (!req || !req.body || !req.body.message) {
        res.send({
            message: 'Invalid Body Data',
            code: 400
        })
    }
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