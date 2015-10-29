var mongodb = require('mongodb');
var assert = require('assert');
var client = mongodb.MongoClient;
//var url = 'mongodb://localhost:27017/dispatchr'; //for local test
var url = 'mongodb://xuchang:xuchangchen@ds045714.mongolab.com:45714/dispatchr'; //mongolab

//add new customer's info
module.exports.addNewCustomer = function(req, res){
	client.connect(url, function(err, db){
		db.collection("customers").insertOne(req.body, function(err, res){
			assert.equal(null, err);	
			assert.equal(1, res.insertedCount);		
			db.close();
		});
		res.sendStatus(200);
	});
};

//pull customer info
module.exports.getCustomerInfo = function(req, res){
	client.connect(url, function(err, db){
		db.collection("customers").find(req.body).toArray(function(err, data){
			res.send(data);
			db.close();
		});
	});
};


//update existing customer info
module.exports.updateExCustomer = function(req, res){
	var query = {CustomerUsername: req.body.CustomerUsername};
	client.connect(url, function(err, db){
		db.collection("customers").update(query, req.body, function(err, res){
			assert.equal(null, err);
			db.close();
		});
		res.sendStatus(200);
	});
};