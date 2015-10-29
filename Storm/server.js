'use strict'

var express = require('express');

var app = express();

app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.get('/',function(req,res){
	res.sendFile('main.html',{'root':__dirname + '/public'});
})


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test2');

var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err) // ...
  console.log('meow');
});


app.get('/api/customers',function(req,res){
	console.log('got here 300');
	//CODE TO INTERACT WITH MONGODB HERE. NOT FINISHED.

 var resbody = [];

 MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  

 var cursor =db.collection('customers').find();
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         //console.dir(doc);
         resbody.push(doc);
         console.log('Sent Data: ', doc);
      } else {

      }
   });



	});
 
 res.send(resbody.toString());

})


app.listen('3000',function(){
	console.log('Server running at http://localhost:3000 !!')
})

//mongodb
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var ObjectId = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/test2';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});


//for finding customers
var findCustomers = function(db, callback) {
	var cursor =db.collection('customers').find();
   	cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};


/*
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  findCustomers(db, function() {
      db.close();
  });
}); 
*/