/**
 * Created by Tejas on 10/24/2015.
 */

// SERVER CONTROLLER

// require mongoose
var mongoose = require('mongoose');

// require customer model
var Order = mongoose.model('Order');

// set database functions (runs as immediate function)
module.exports = (function(){
	return {
		show: function(request,response){
			Order.find({}, function(error,results){
				if(error){
					console.log('database error during add');
					response.json('error');
				}
				else
				{
					console.log('show all (server controller)',results);
					response.json(results);
				}
			})			
		},
		add: function(request,response){
			var newOrder = new Order({
				name:request.body.name,
				product:request.body.product,
				quantity:request.body.quantity,
				created_at:request.body.created_at
			});

			newOrder.save(function(error){
				if(error){
					console.log('database error during add');
					response.json('error');
				}
				else{
					console.log('added to db (server controller)',newOrder);
					response.json(newOrder);
				}
			})			
		},
		delete: function(request,response){ 
			// findByIdAndRemove
			Order.findByIdAndRemove(request.body._id, function(error,results){
				if(error){
					console.log('database error occurred during delete',error);
					response.json('error');
				}
				else{
					console.log('deleted in server controller:',results);
					response.json(results);	
				}
			})			
		}
	}
})();