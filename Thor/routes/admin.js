var router = require('express').Router(),
	Item = require('../models/item'),
	redisClient = require('../redis_client');

router.post('/item', function(req, res) {

	var item = new Item(req.body);

	item.save(function(err, newItem) {
		if(err) {

			console.log('Error newItem:', err);
			res.send({ bSuccess: false, bMessage: 'Item added unsuccessfully' });

		} else {

			var key = 'aItems';
			redisClient.hgetall(key, function(err, aItems) {
				console.log('adding to redis');
				var aItems = JSON.parse(aItems.sJSON);
				aItems.push(newItem);
				var sJSON = JSON.stringify(aItems);

				redisClient.hmset(key, { sJSON: sJSON }, function(err, oResult) {

					if(err) return console.log('Error adding items to redis:', err);

					res.send({ bSuccess: true, bMessage: 'Item added successfully', item: newItem });

				});
				
			});
		}
	});

});

router.put('/item', function(req, res) {

	Item.find({ _id: req.body._id }, function(err, items) {

		if(err || items.length < 1) {
			console.log('Error or not matching item found:', err);
			return res.send({ bSuccess: false });
		}

		var item = items[0];
		item.name = req.body.name;
		item.price = req.body.price;
		item.tags = req.body.tags;

		item.save(function(err, updatedItem) {

			if(err) {
				console.log('Error updating item:', err);
				return res.send({ bSuccess: false, bMessage: 'Item not updated' });
			}

			var key = 'aItems';
			redisClient.hgetall(key, function(err, aItems) {
				console.log('updating redis');
				var aItems = JSON.parse(aItems.sJSON);
				var idx = aItems.findIndex(function(elem) {
					return elem._id === updatedItem._id
				});
				aItems[idx] = updatedItem;
				var sJSON = JSON.stringify(aItems);

				redisClient.hmset(key, { sJSON: sJSON }, function(err, oResult) {

					if(err) return console.log('Error adding items to redis:', err);

					res.send({ bSuccess: true, bMessage: 'Item updated successfully', updatedItem: updatedItem });

				});
				
			});

		});

	});

});

module.exports = router;

































