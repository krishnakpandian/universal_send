const Twitter = require('./twitter.js');
const Reddit = require('./reddit.js');
const express = require('express');
const bodyParser = require('body-parser');
const { response } = require('express');
const app = express();
const PORT = process.env.port || 3000;


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


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

app.post('/facebook', (req,res) => {
    if (!req || !req.body || !req.body.message) {
        res.send({
            message: 'Invalid Body Data',
            code: 400
        })
    }

});

app.post('/reddit', (req,res) => {
    if (!req || !req.body || !req.body.message) {
        res.send({
            message: 'Invalid Body Data',
            code: 400
        })
    }
    Reddit.redditPost({  
    subredditName: 'testingground4bots',
    title: 'This is a Bot',
    body: 'This is a Bot Posting'}, (res) => {
        console.log(response)
    })
});

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
    const tweet = Twitter.getRecentTweet({count: 1, include_rts: false});
})

app.delete('/twitter', (req, res) => {

});

app.delete('/facebook', (req, res) => {

});

app.delete('/reddit', (req, res) => {

});


app.listen(PORT, function(){
    console.log('Server Running on PORT ' + PORT);
})