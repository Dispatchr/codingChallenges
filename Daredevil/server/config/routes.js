/**
 * Created by Tejas on 10/24/2015.
 */
// require server controller 
var customers = require('./../controllers/customers');
var orders = require('./../controllers/orders');
var products = require('./../controllers/products');

module.exports = function(app) {

	app.post('/products/upload', function(request,response){
		console.log('upload in server js');
		multipartform.upload(request,response);
	})

	// run products delete() function in server controller
	app.post('/products/delete/', function(request,response){
		console.log('delete in server js');
		products.delete(request,response);
	})

	// run products showOne() function in server controller
	app.get('/products/show/:id', function(request,response){
		console.log('show One in server js');
		products.showOne(request,response);
	})

	// run products edit() function in server controller
	app.post('/products/edit', function(request,response){
		products.edit(request,response);
	})

	// run products add() function in server controller
	app.post('/products/add', function(request,response){
		products.add(request,response);
	})


	// run products show() function in server controller
	app.get('/products/show',function(request,response){
		products.show(request,response);
	})

	// run orders show() function in server controller
	app.get('/orders/show',function(request,response){
		orders.show(request,response);
	})

	// run orders add() function in server controller
	app.post('/orders/delete',function(request,response){
		console.log('value to delete in server js:',request.body.name);
		orders.delete(request,response);
	})

	// run orders add() function in server controller
	app.post('/orders/add',function(request,response){
		console.log('value to add in server js:',request.body.name);
		orders.add(request,response);
	})

	// run customer.add() function in server controller
	app.post('/customers/delete',function(request,response){
		console.log('value to delete in server js:',request.body.name);
		customers.delete(request,response);
	})

	// run customer.add() function in server controller
	app.post('/customers/add',function(request,response){
		console.log('value to add in server js:',request.body.name);
		customers.add(request,response);
	})

	app.post('/customers/edit', function(request,response){
		console.log('edited',request.body);
		customers.edit(request,response);
	})

	// run customer.show() function in server controller
	app.get('/customers/show',function(request,response){
		customers.show(request,response);
	})

	// don't need this - it's for ejs; the index.html gets served w/o involving server
	app.get('/',function(request,response){
		response.render('index');
	})
}