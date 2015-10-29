//-------------------------------- node_modules ---------------------------------
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');
var morgan = require('morgan');

//-------------------------------- server setting ---------------------------------
var app = express();
app.set('port', 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//-------------------------------- server middleware ---------------------------------
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser('cookie'));
app.use(session({secret: 'secret',
				resave: true,
				saveUninitialized: true}
				));
app.use(express.static(path.join(__dirname, '/public/js')));
app.use(express.static(path.join(__dirname, '/public/css')));
app.use(morgan('combined'));

//-------------------------------- admin routes ---------------------------------
var mongodb = require('mongodb');
var assert = require('assert');
var client = mongodb.MongoClient;
//var url = 'mongodb://localhost:27017/dispatchr'; //for local test
var url = 'mongodb://xuchang:xuchangchen@ds045714.mongolab.com:45714/dispatchr'; //mongolab

var customerRt = require('./routes/customerRt');
var orderRt = require('./routes/orderRt');

app.get('/admin', function(req, res){
	res.render(app.get('views') + '/main.jade');
});
app.post('/addNewCustomer', customerRt.addNewCustomer); //add new customer's info
app.post('/getCustomerInfo', customerRt.getCustomerInfo); //pull customer info
app.post('/updateExCustomer', customerRt.updateExCustomer); //update existing customer info
app.get('/showAll', orderRt.showAll); //show all the orders
app.post('/addNewCustomerOrder', orderRt.addNewCustomerOrder); //add new customer's first order
app.post('/addNewOrder', orderRt.checkExCustomer, orderRt.addNewOrder); //add new order for existing customer
app.post('/deleteExOrder', orderRt.deleteExOrder); //delete existing order
app.post('/updateExOrder', orderRt.updateExOrder); //update existing order

//inventory routes
app.put('/addInventory', function(req, res){
	client.connect(url, function(err, db){
		db.collection('inventory').insertOne(req.body, function(err, res){
			assert.equal(err, null);
			assert.equal(1, res.insertedCount);
			db.close();
		});
		res.sendStatus(200);
	});
});

app.get('/showInventory', function(req, res){
	client.connect(url, function(err, db){
		db.collection('inventory').find({}).toArray(function(err, data){
			res.send(data);
			db.close();
		});
	});
});

//-------------------------------- customer routes ---------------------------------

app.get('/', function(req, res){
	res.render(app.get('views') + '/AdminOrCust.jade');
});

app.get('/customer', function(req, res){
	res.render(app.get('views') + '/customerMain.jade');
});

app.post('/custLogin', function(req, res){
	client.connect(url, function(err, db){
		db.collection('customers').find({CustomerUsername: req.body.CustomerUsername})
			.toArray(function(err, data){
				assert.equal(err, null);
				if(data.length === 1){
					req.session.username = data[0].CustomerUsername;
					res.send(data[0]);
					db.close();
				}
				else{
					res.send("FAIL");
					db.close();
				}
		});
	})
});

app.post('/custShowAll', function(req, res){
	client.connect(url, function(err, db){
		db.collection('orders').find({CustomerUsername: req.body.CustomerUsername})
			.toArray(function(err, data){
				assert.equal(err, null);
				if(data.length === 1){
					res.send(data[0].Orders);
					db.close();
				}
				else{
					res.send("EMPTY");
					db.close();
				}
			});
	});
})


//-------------------------------- port ---------------------------------
app.listen(app.get('port'), function(){
	console.log("listening on port " + app.get('port'));
});