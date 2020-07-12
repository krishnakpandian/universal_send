const Twitter = require('./twitter.js');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.port || 3000;


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.post('/', function(req,res, next){
    Twitter.TwitterPost({message: req.body.message}, (response) => {
        console.log(response);
        res.send(response)
    });

});

app.listen(PORT, function(){
    console.log('Server Running on PORT ' + PORT);
})