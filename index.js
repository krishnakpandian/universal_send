const Twitter = require('./twitter.js');
const Reddit = require('./reddit.js');
const express = require('express');
const bodyParser = require('body-parser');
const { response } = require('express');
const app = express();
const PORT = process.env.port || 3000;


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/*
    {
        message: "",
        imagePathway: ""
        oneTweet: boolean
    }
*/
app.post('/twitter', (req, res) => {
    if (!req || !req.body || !req.body.message) {
        res.send({
            message: 'Invalid Body Data',
            code: 400
        }).status(400)
    } else {
        Twitter.TwitterPost({ message: req.body.message }, (response) => {
            console.log(response);
            res.send(response).status(response.code)
        });
    }
});

/*
    {
        message: "",
        imagePathway: ""
    }
*/
app.post('/facebook', (req, res) => {
    if (!req || !req.body || !req.body.message) {
        res.send({
            message: 'Invalid Body Data',
            code: 400
        }).status(400)
    }

});

/*
    {
        message: "",
        title: "",
        imagePathway: "",
        subreddit: "",

    }
*/
app.post('/reddit', (req, res) => {
    if (!req || !req.body || !req.body.message || !req.body.title || !req.body.subreddit) {
        res.send({
            message: 'Invalid Body Data',
            code: 400
        }).status(400)
    }
    const submission = Reddit.redditPost({
        subredditName: req.body.subreddit, // Test in testingground4bots
        title: req.body.title,
        body: req.body.message
    })

    if (submission != null) {
        res.send({
            message: 'Successful Post to Reddit API',
            code: 201
        }).status(201)
    } else {
        res.send({
            message: 'Unable to Post to Reddit API',
            code: 400
        }).status(400)
    }
});


/*
    {
        platforms: {
            twitter: boolean,
            facebook: boolean,
            reddit: boolean
        }
        fields: {
            oneTweet: true, 
            subreddit: ""
            title: ""
        }
        message: "",
        title: "",
        imagePathway: ""
    }
*/
app.post('/all', (req, res) => {
    if (!req || !req.body || !req.body.message) {
        res.send({
            message: 'Invalid Body Data',
            code: 400
        })
    }
    Twitter.TwitterPost({ message: req.body.message }, (response) => {
        console.log(response);
        res.send(response)
    });
});

app.get('/', (req, res) => {
    //const tweet = Twitter.getRecentTweet({count: 1, include_rts: false});
    res.send('Hello World')
})


/*
    {
        id: ""
    }
*/
app.delete('/twitter', (req, res) => {
    if (!req || !req.body || !req.body.id) {
        res.send({
            message: 'Invalid Body Data',
            code: 400
        }).status(400)
    } else {
        Twitter.TwitterDeletePost({id: req.body.id}, (response) => {
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

});

/*
    {
        id: ""
    }
*/
app.delete('/reddit', (req, res) => {

});


app.listen(PORT, function() {
    console.log('Server Running on PORT ' + PORT);
})