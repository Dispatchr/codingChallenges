/**
 * Created by Tejas on 10/24/2015.
 */

// SERVER CONTROLLER

// require mongoose
var mongoose = require('mongoose');

// require customer model
var Product = mongoose.model('Product');

// set database functions (runs as immediate function)
module.exports = (function(){
	return {
		delete: function(request,response){ 
			console.log('id:',request.body.id);
			Product.findByIdAndRemove(request.body.id, function(error,results){
				if(error){
					console.log('product.delete() error (in server controller)',error);
					response.json(error);
				}
				else
				{
					console.log('product.delete() results (in server controller)',results);
					response.json('product deleted');
				}
			})		
		},
		show: function(request,response){
			// run query and pass in callback method
			Product.find({}, function(error,results){
				if(error){
					console.log('product.show() error (in server controller)',error);
					response.json(error);
				}
				else
				{
					// console.log('product.show() results (in server controller)',results);
					response.json(results);
				}
			})			
		},
		showOne: function(request,response){
			// run query and pass in callback method
			console.log('product id:',request.params.id);
			Product.findById(request.params.id, function(error,results){
				if(error){
					console.log('product.showOne() error (in server controller)',error);
					response.json(error);
				}
				else
				{
					console.log('product.showOne() results (in server controller)',results);
					response.json(results);
				}
			})			
		},
		add: function(request,response){
			console.log('here3');
			// create a new instance of model, saving object to it
			var newProduct = new Product({
				name:request.body.name,
				image:request.body.image,
				description:request.body.description,
				inventory:request.body.inventory,
				created_at:request.body.created_at
			});

			// run save method and callback with new record added
			newProduct.save(function(error){
				if(error){
					console.log('product.add() error (in server controller)',error);
					response.json(error);
				}
				else
				{
					console.log('product.add() results (in server controller)',newProduct);
					response.json(newProduct);
				}
			})			
		},
		edit: function(request,response){
			Product.findByIdAndUpdate(request.body._id, {$set:{
				name:request.body.name,
				image:request.body.image,
				description:request.body.description,
				inventory:request.body.inventory}},
			function(error,results){
				if(error){
					console.log('product.edit() error (in server controller)',error);
					response.json(error);
				}
				else
				{
					console.log('product.edit() results (in server controller)',results);
					response.json('results');
				}
			})
		},
	
	}
})();