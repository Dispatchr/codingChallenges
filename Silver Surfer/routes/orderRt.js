var mongodb = require('mongodb');
var assert = require('assert');
var client = mongodb.MongoClient;
//var url = 'mongodb://localhost:27017/dispatchr'; //for local test
var url = 'mongodb://xuchang:xuchangchen@ds045714.mongolab.com:45714/dispatchr'; //mongolab

//show all the orders
module.exports.showAll = function(req, res){
	client.connect(url, function(err, db){
		db.collection("orders").find().toArray(function(err, data){
			res.send(data);
			db.close();
		});
	});
};


//add new customer's first order
module.exports.addNewCustomerOrder = function(req, res){
	client.connect(url, function(err, db){
		db.collection("orders").insertOne(req.body, function(err, res){
			assert.equal(null, err);
			assert.equal(1, res.insertedCount);
			db.close();
		});
		res.sendStatus(200);
	});
};

//check customer name if existed
module.exports.checkExCustomer = function(req, res, next){
	client.connect(url, function(err, db){
		db.collection("orders")
			.find({CustomerUsername: req.body.CustomerUsername})
			.toArray(function(err, data){
				if(data.length === 1) next();
				else res.send("FAIL");
		});
	});
};

//add new order for existing customer
module.exports.addNewOrder = function(req, res){
	client.connect(url, function(err, db){
		db.collection("orders").update(
			{CustomerUsername: req.body.CustomerUsername},
			{$push: {Orders: req.body.NewOrder}},
			function(err, res){
				assert.equal(null, err);			
				db.close();
		});
		res.sendStatus(200);
	});
};

//delete existing order
module.exports.deleteExOrder = function(req, res){
	console.log(req.body);
	client.connect(url, function(err, db){
		db.collection("orders").update(
			{CustomerUsername: req.body.CustomerUsername}, 
			{$pull: {Orders: {Key: req.body.Key}}}, 
			function(err, res){
				assert.equal(null, err);
				db.close();
		});
		res.sendStatus(200);
	});
};

//update existing order
module.exports.updateExOrder = function(req, res){
	client.connect(url, function(err, db){
		db.collection("orders").update(
			{
				CustomerUsername: req.body.CustomerUsername, 
				'Orders.Key': req.body.originKey
			},
			{$set: 
				{'Orders.$.OrderName': req.body.OrderName, 
				'Orders.$.Amount': req.body.Amount, 
				'Orders.$.Rate': req.body.Rate,
				'Orders.$.Key': req.body.Key}
			},
			function(err, res){
				assert.equal(null, err);
				db.close();
		});
		res.sendStatus(200);
	});
};