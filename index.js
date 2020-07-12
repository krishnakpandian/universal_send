const Twitter = require('./twitter.js');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.port || 3000;


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.post('/', async function(req,res){
    res.send('Hello World');
    console.log(req.body);
    Twitter.TwitterPost({message: req.body.message}, (res) => {console.log(res)});
});

app.listen(PORT, function(){
    console.log('Server Running on PORT ' + PORT);
})