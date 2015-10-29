var router = require('express').Router(),
	Item = require('../models/item'),
	User = require('../models/user'),
	redisClient = require('../redis_client');


router.get('/', function(req, res) {

	if(req.oUser) {

		// MAKE THIS A MODULE
		// Check redis 
		var key = 'aItems';

		redisClient.hgetall(key, function(err, aItems) {

			if(err) {
				// Do more
				console.log('Error retrieving', key, 'from redis');
			}

			if(!aItems) {

				Item.find({}).exec(function(err, aItems) {

					var sJSON = JSON.stringify(aItems);
					redisClient.hmset(key, { sJSON: sJSON }, function(err, oResult) {
						console.log('setting data to redis');
						if(err) {
							console.log('Error adding items to redis:', err);
						}

						res.send({ 
							bAdmin: req.oUser.admin,
							sUsername: req.oUser.username,
							bSuccess: true, 
							aItems: aItems
						});

					});

				});

			// Date returned from redis
			} else {
				console.log('data pulled from redis');
				var aItems = JSON.parse(aItems.sJSON);
				res.send({ 
					bAdmin: req.oUser.admin,
					sUsername: req.oUser.username,
					bSuccess: true, 
					aItems: aItems
				});
			}
		});

	// User not authorized to shop		
	} else {		
		res.status(401).send({ 
			bSuccess: false, 
			sMessage: 'Unathorized Access'
		});		
	}

});

router.get('/search', function(req, res) {

	Item.aggregate([
		{ $unwind: "$tags" },
		{ $match: { "tags": "home"} }
		// { $group: { _id: null, count: { $sum: 1 } } }
	], function(err, items) {

		console.log('items:', items);

		res.send({ bSuccess: true, items: items });
	});

});

router.post('/', function(req, res) {

	if(req.session.userID) {

		console.log('shop order:', req.body);

		User.find({ _id: req.session.userID }).exec(function(err, users) {

			var user = users[0];

			User.findByIdAndUpdate(user._id, 
				{ $push: { "orders": { items: req.body } } },
				{ 'new': true, upsert: false }
			, function(err, oUser) {
	
				res.send({ bSuccess: true, bMessage: 'Order successful!' });	

			});
			
		});	

	} else {

		res.send({ bSuccess: false, bMessage: 'Order failed!' });	

	}
	
});


module.exports = router;