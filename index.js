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
app.post('/twitter', (req,res) => {
    if (!req || !req.body || !req.body.message) {
        res.send({
            message: 'Invalid Body Data',
            code: 400
        })
    }
    Twitter.TwitterPost({message: req.body.message}, (response) => {
        console.log(response);
        res.send(response)
    });
});

/*
    {
        message: "",
        imagePathway: ""
    }
*/
app.post('/facebook', (req,res) => {
    if (!req || !req.body || !req.body.message) {
        res.send({
            message: 'Invalid Body Data',
            code: 400
        })
    }

});

/*
    {
        message: "",
        title: "",
        imagePathway: "",
        subreddit: ""
    }
*/
app.post('/reddit', (req,res) => {
    if (!req || !req.body || !req.body.message) {
        res.send({
            message: 'Invalid Body Data',
            code: 400
        })
    }
    Reddit.redditPost({  
    subredditName: 'testingground4bots',
    title: 'Krishnapi Worked!',
    body: 'Yeah!'}, (res) => {
        console.log(response)
    })
    res.send("Cool")
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
        }
        message: "",
        title: "",
        imagePathway: ""
    }
*/
app.post('/all', (req,res) => {
    if (!req || !req.body || !req.body.message) {
        res.send({
            message: 'Invalid Body Data',
            code: 400
        })
    }
    Twitter.TwitterPost({message: req.body.message}, (response) => {
        console.log(response);
        res.send(response)
    });
});

app.get('/', (req,res) => {
    //const tweet = Twitter.getRecentTweet({count: 1, include_rts: false});
    res.send('Hello World')
})


/*
    {
        id: ""
    }
*/
app.delete('/twitter', (req, res) => {

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


app.listen(PORT, function(){
    console.log('Server Running on PORT ' + PORT);
})