
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http');

var app = express();

 // Mongo setup
var databaseUrl = "company"; 
var collections = ["employees"]
var db = require("mongojs").connect(databaseUrl, collections);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

// Import the data
require('./import')(db);

// Facilitates queries on mongodb
function caseInsensitive(keyword){
  // Trim
  keyword = keyword.replace(/^\s+|\s+$/g, '');

  return new RegExp(keyword, 'gi');
}

app.get('/query/:term', function(req, res){

  var term = req.params.term;

  // Break out all the words
  var words = req.params.term.split(" ");
  var patterns = [];

  // Create case insensitve patterns for each word
  words.forEach(function(item){
    patterns.push(caseInsensitive(item));
  });

  db.employees.find({index : {$all: patterns }}, function(err, results) {
    if( err || !results) {
      console.log('nothing');
      res.json([]);
    } else {
      console.log(results);
      res.json(results);
    }
  });  
  

});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
