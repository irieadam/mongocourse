var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    express = require('express'),
    app = express(),
    engines = require('consolidate');


app.engine('html',engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

MongoClient.connect('mongodb://localhost:27017/video', function (err,db) {
    assert.equal(null,err);
    console.log("Successfully connected to server");

    app.get('/', function (req,res) {
        db.collection('movies').find({}).toArray(function (err,docs) {
            res.render('movies' , { 'movies': docs})    
        });
        
    });

    var server = app.listen(3000,function(){
        var port = server.address().port;
        console.log('Express server listening');
    });
    
    app.get('/:name', function(req, res, next) {
        var name = req.params.name;
        var getvar1 = req.query.getvar1;
        var getvar2 = req.query.getvar2;
        res.render('hello', { name : name, getvar1 : getvar1, getvar2 : getvar2 });
    });

    console.log("Called find()");
});

