Items = new Meteor.Collection('items');
Orders = new Meteor.Collection('orders');
Customers = new Meteor.Collection('customers');
Router.configure({
	layoutTemplate: 'main'
	
	
})
Router.route('/',{
	name : 'home',
	template: 'home',
	
})
Router.route('/register');
Router.route('/login');
Router.route('/addNewCustomer');
Router.route('/addNewItem');
Router.route('/editCustomerInfo');
Router.route('/editItemInfo');
Router.route('/modifyCustomerInfo/:_id', {
	name: 'modifyCustomerInfo',
	template: 'modifyCustomerInfo',
	data: function(){
		var currentCustomer = this.params._id;
			
			return Customers.findOne({_id: currentCustomer});
		},
	onBeforeAction: function(){
		var currentUser = Meteor.userId();
		if (currentUser){
			this.next();
			
			}else{
				this.render("login");
				}
		},
	
	
});
Router.route('/addNewOrder');
Router.route('/modifyItemInfo/:_id', {
	name: 'modifyItemInfo',
	template: 'modifyItemInfo',
	data: function(){
		var currentItem = this.params._id;
			
			return Items.findOne({_id: currentItem});
		},
	onBeforeAction: function(){
		var currentUser = Meteor.userId();
		if (currentUser){
			this.next();
			
			}else{
				this.render("login");
				}
		},
	
	
});
Router.route('/viewOrder');
Router.route('/viewOrderDetails/:_id', {
	name: 'viewOrderDetails',
	template: 'viewOrderDetails',
	data: function(){
		var orderId = this.params._id;
			var orderDetails = Orders.findOne({_id: orderId});
			console.log(orderDetails.itemsInCart);
			var itemsInCart = orderDetails.itemsInCart;
			var templateData = {items: itemsInCart};
			 return templateData;
		},
	onBeforeAction: function(){
		var currentUser = Meteor.userId();
		if (currentUser){
			this.next();
			
			}else{
				this.render("login");
				}
		},
	
	
});
if (Meteor.isClient) {
	$.validator.setDefaults({
	 rules: {
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minlength: 6
        }
    },
    messages: {
        email: {
            required: "You must enter an email address.",
            email: "You've entered an invalid email address."
        },
        password: {
            required: "You must enter a password.",
            minlength: "Your password must be at least {0} characters."
        }
    }
	 
	 });
  Template.register.events({
	  'submit form': function(event){
			event.preventDefault();
		  
		  }
	  
	  });

Template.register.onRendered(function(){
    $('.register').validate({
		submitHandler: function(event){
				var email= $('[name=email]').val();
				var password = $('[name=password]').val();
				
				Accounts.createUser({
					email: email,
					password: password
					}, function(error){
						if(error){
							if(error.reason == "Email already exists."){
								validator.showErrors({
									email: "That email already belongs to a registered user."   
								});
							}
							}else{
							Router.go("home");
							}
					});
				Router.go('home');
			
			}
		
		});
});

Template.login.onRendered(function(){
	
	console.log("The login template was just rendered");
	var validator = $('.login').validate({
		submitHandler: function(event){
				var email = $('[name=email]').val();
				var password = $('[name=password]').val();
				
				Meteor.loginWithPassword(email, password, function(error){
						if(error){
								if(error.reason == "User not found"){
									validator.showErrors({
										email: "That email doesn't belong to a registered user."   
									});
								}
								if(error.reason == "Incorrect password"){
									validator.showErrors({
										password: "You entered an incorrect password."    
									});
								}
							}else{
							var currentRoute = Router.current().route.getName();
								if (currentRoute == "login"){
									Router.go("home");
								}
							}
					
					});
			}
		
		});
});	

/**/
Template.navigation.events({
	'click .logout': function(event){
			event.preventDefault();
			Meteor.logout();
			Router.go('login');
		}
	
});
/**/

/**/
Template.addNewCustomer.events({
	'submit form': function(e){
			e.preventDefault();
		}
	
});
Template.addNewItem.events({
	'submit form': function(e){
			e.preventDefault();
		}
	
});
Template.addNewCustomer.onRendered(function(){
    $('.addNewCustomer').validate({
		submitHandler: function(event){
				var name= $('[name=name]').val();
				var email = $('[name=email]').val();
				var phone = $('[name=phone]').val();
				var address = $('[name=address]').val();
				var ccNumber = $('[name=ccNumber]').val();
				var currentUser = Meteor.userId();
				
				var isExistCustomers = Customers.findOne({email: email});
				if (isExistCustomers){
					var c = confirm("Customer is existed. Do you want to edit?")
					if (c){
						Router.go('modifyCustomerInfo', {_id: isExistCustomers._id});
						$('[name=email]').val('');
						}
					}else{
						Customers.insert({
								name: name,
								email: email,
								phone: phone,
								address: address,
								ccNumber: ccNumber,
								createdBy: currentUser,
								createAt: new Date()
							});
						console.log("Success");
					}
			}
		
		});
});

Template.addNewItem.onRendered(function(){
    $('.addNewItem').validate({
		submitHandler: function(event){
				var pname= $('[name=pname]').val();
				var brand = $('[name=brand]').val();
				var snumber = $('[name=snumber]').val();
				var model = $('[name=model]').val();
				var price = $('[name=price]').val();
				var currentUser = Meteor.userId();
				
				var isExistItems = Items.findOne({snumber: snumber});
				if (isExistItems){
					console.log("Item is existed. Do you want to edit?")
					}else{
						Items.insert({
								pname: pname,
								brand: brand,
								snumber: snumber,
								model: model,
								price: price,
								createdBy: currentUser,
								createAt: new Date()
							});
						alert("The Item is added");
						Router.go('addNewItem');
				$('[name=pname]').val('');
				$('[name=brand]').val('');
				$('[name=snumber]').val('');
				$('[name=model]').val('');
				$('[name=price]').val('');
					}
			}
		
		});
});
/**/

/**/
Template.lookUpCustomer.events({
	'keyup [name=lookByEmail]':function(){
		
			
			var email = $(event.target).val();
			//var foundCustomers = Customers.find({email: email});
			//console.log(foundCustomers)
			if(event.which ==13 || event.which == 27){
				$(event.target).blur();
				$(event.target).val('');
			} 
			Session.set("foundCustomersEmail", email);
		},
	'keyup [name=lookByName]':function(){
		
			var name = $(event.target).val();
			//var foundCustomers = Customers.find({name: name});
			//console.log(foundCustomers)
			if(event.which ==13 || event.which == 27){
				$(event.target).blur();
				$(event.target).val('');
			} 
			Session.set("foundCustomersName", name);
		},
	'keyup [name=lookByPhone]':function(){
	
			var phone = $(event.target).val();
			//var foundCustomers = Customers.find({phone: phone});
			//console.log(foundCustomers)
			if(event.which ==13 || event.which == 27){
				$(event.target).blur();
				$(event.target).val('');
			}
			Session.set("foundCustomersPhone", phone);
		}
});
Template.lookUpItem.events({
	'keyup [name=lookByBrand]':function(){
		
			
			var brand = $(event.target).val();
			//var foundCustomers = Customers.find({email: email});
			//console.log(foundCustomers)
			if(event.which ==13 || event.which == 27){
				$(event.target).blur();
				$(event.target).val('');
			} 
			Session.set("foundCustomersBrand", brand);
		},
	'keyup [name=lookBySnumber]':function(){
		
			var snumber = $(event.target).val();
			//var foundCustomers = Customers.find({name: name});
			//console.log(foundCustomers)
			if(event.which ==13 || event.which == 27){
				$(event.target).blur();
				$(event.target).val('');
			} 
			Session.set("foundCustomersSnumber", snumber);
		},
	'keyup [name=lookByModel]':function(){
	
			var model = $(event.target).val();
			//var foundCustomers = Customers.find({phone: phone});
			//console.log(foundCustomers)
			if(event.which ==13 || event.which == 27){
				$(event.target).blur();
				$(event.target).val('');
			}
			Session.set("foundCustomersModel", model);
		}
});
/**/
/**/
Template.foundCustomers.helpers({
	'foundCustomers' : function(){
			var name = Session.get("foundCustomersName");
			var email = Session.get("foundCustomersEmail");
			var phone = Session.get("foundCustomersPhone");
			return Customers.find({
			email: {$regex: email,$options: 'i'},
									},{sort: {name:1}});
			
		}
	
});
Template.foundItems.helpers({
	'foundItems' : function(){
			var brand = Session.get("foundCustomersBrand");
			var snumber = Session.get("foundCustomersSnumber");
			var model = Session.get("foundCustomersModel");
			return Items.find({
			snumber: {$regex: snumber,$options: 'i'},
									},{sort: {brand:1}});
			
		}
	
});
/**/
/*
Template.modifyCustomerInfo.onRendered(function(){
	
	
	var validator = $('.editCustomerInfo').validate({
		submitHandler: function(event){
				var documentId = this._id;
				var name= $('[name=name]').val();
				var email = $('[name=email]').val();
				var phone = $('[name=phone]').val();
				var address = $('[name=address]').val();
				var ccNumber = $('[name=ccNumber]').val();
				var currentUser = Meteor.userId();
				console.log(documentId);
				Customers.update({
					_id: documentId
					},{$set:
						{
								name: name,
								email: email,
								phone: phone,
								address: address,
								ccNumber: ccNumber,
								lastEditedBy: currentUser,
								lastEditedAt: new Date()
								}
					
					},function(error){
							if(error){
								alert(error.reason);
							}else{
								alert("Saved!!");
							}
					
					});
				
			}
		
		});
});	
*/
/**/
Template.modifyCustomerInfo.events({
	'submit form': function(event){
			event.preventDefault();
			var documentId = this._id;
				var name= $('[name=name]').val();
				var email = $('[name=email]').val();
				var phone = $('[name=phone]').val();
				var address = $('[name=address]').val();
				var ccNumber = $('[name=ccNumber]').val();
				var currentUser = Meteor.userId();
				console.log(documentId);
				Customers.update({
					_id: documentId
					},{$set:
						{
								name: name,
								email: email,
								phone: phone,
								address: address,
								ccNumber: ccNumber,
								lastEditedBy: currentUser,
								lastEditedAt: new Date()
								}
					
					},function(error){
							if(error){
								alert(error.reason);
							}else{
								alert("Saved!!");
								Router.go('editCustomerInfo');
							}
					
					});
		
		}
	
	
});

Template.modifyItemInfo.events({
	'submit form': function(event){
			event.preventDefault();
			var documentId = this._id;
				var pname= $('[name=pname]').val();
				var brand = $('[name=brand]').val();
				var snumber = $('[name=snumber]').val();
				var model = $('[name=model]').val();
				var price = $('[name=price]').val();
				var currentUser = Meteor.userId();
				console.log(documentId);
				Items.update({
					_id: documentId
					},{$set:
						{
								pname: pname,
								brand: brand,
								snumber: snumber,
								model: model,
								price: price,
								lastEditedBy: currentUser,
								lastEditedAt: new Date()
								}
					
					},function(error){
							if(error){
								alert(error.reason);
							}else{
								alert("Saved!!");
								Router.go('editItemInfo');
							}
					
					});
		
		}
	
	
});
/**/
Template.addNewOrder.events({
	'change [name=email]': function(e){
	
			var email = $(event.target).val();
			Session.set("emailOrder",email);
		},
	'submit form': function(e){
			e.preventDefault();
			var c = confirm("Are you sure to checkout?");
			if (c){
				var email = $('[name=email]').val();
				console.log("checkout email:" + email)
				var isEmailValid = Customers.findOne({email: email});
				console.log("isEmailValid" + isEmailValid);
				if (isEmailValid){
					
					var currentUser = Meteor.userId();
					var openOrder = Orders.findOne({createdBy: currentUser, orderStatus:false});
					console.log("openOrderId:" + openOrder._id);
					var openOrderId = openOrder._id;
					var order = {orderId : openOrderId, email: email, orderStatus: true};
					Meteor.call("updateOrderStatus", order);
					//Orders.update({_id: openOrderId},{$set: {orderStatus: true, customerEmail: email}});
					alert("Successfully checkout");
					Router.go('viewOrder');
				}else{
					alert('Customer email does not exist. Please create new one!')
				}
					}
				
		},
	'click .clearCart': function(e){
			e.preventDefault();
			var currentUser = Meteor.userId();
			var deleteOrder = Orders.findOne({createdBy:currentUser, orderStatus: false});
			console.log("delete this OrderID:" + deleteOrder._id)
			var documentId = deleteOrder._id;
			Orders.remove({_id: documentId});
		}
	
});
Template.addNewOrder.helpers({
	'isEmailValid': function(){
		console.log('isEmailValid');
		//var email = $('[name=email]').val(); 
		var email = Session.get('emailOrder');
		if (email){
					return Customers.findOne({email: email});
			}
	
		}
	
	
});
/**/
Template.itemTable.helpers({
	'items': function(event){
			return Items.find();
		}
	
	
});
Template.itemTable.events({
	'click .addToCart': function(event){
			event.preventDefault();
			var documentId = this._id;
			var currentUser = Meteor.userId();
		//console.log("addToCart" + documentId);
			var isOrderCreated = Orders.findOne({
					createdBy: currentUser,
					orderStatus: false
				});
			if (isOrderCreated){
					var isThisItemExist = Orders.findOne({createdBy: currentUser, orderStatus: false,
						itemsInCart: {$elemMatch:{ itemID: documentId} }
						});
						if (isThisItemExist){
							console.log('increase 1 in qty:' + isThisItemExist);
							var openOrderId = Session.get("openOrder");
							Meteor.call("UpdateOrderQuantity",{orderId: openOrderId, itemId: documentId});
						}
						else{
							console.log('set to 1');
							var openOrderId = Session.get("openOrder");
							Orders.update({
								_id: openOrderId
								},{$push: {itemsInCart:{itemID: documentId, quantity:1}}});
						}
			}else{
			//Create a new open order
			
				var result=	Orders.insert({
						createdBy: currentUser,
						createAt: new Date,
						orderStatus: false,
						itemsInCart: [{itemID: documentId, quantity: 1}]
						},function(error,result){
							if (error){
								console.log(error.reason);
							}else{
								console.log('Create succesfully:' + result);
								Session.set("openOrder", result);
							}
							
						});
			}
				
			}
			
	
});
/**/
/**/
Template.cart.helpers({
	itemsInCart: function(){
			var currentUser = Meteor.userId();
			var itemsInCart =  Orders.findOne({createdBy:currentUser, orderStatus: false},{itemsInCart: 1,createAt:0,createBy:0,_id:0,orderStatus:0});
			if (itemsInCart){
				console.log("What are in cart?:" + itemsInCart);
				return itemsInCart.itemsInCart;
			}

		}
	
	
});


/**/
/**/
Template.matchCustomerEmail.helpers({
	'emails': function(event){
			var email = Session.get('emailOrder');
			//var email = $('[name=email]').val(); 
			//console.log("WHat email: " + email);
			if (email){
				return Customers.find({email: {$regex: email}},{sort: {email: 1}});
			}
			
		},
		'isEmailValid': function(){
		console.log('isEmailValid');
		//var email = $('[name=email]').val(); 
		var email = Session.get('emailOrder');
		if (email){
					return Customers.findOne({email: email});
			}
	
		}
	
	
});

Template.matchCustomerEmail.events({
	'click .autoFillEmail': function(event){
			event.preventDefault();
			var email = event.target.text;
			console.log('found' + email);
			$('[name="email"]').val(email); 
		}
	
	
});
/**/

Template.orderList.helpers({
	orders: function(){
			var currentUser = Meteor.userId();
			return Orders.find({createdBy: currentUser, orderStatus: true});
		
		}
	
	
});
/**/
}

if (Meteor.isServer) {
  Meteor.methods({
	  "UpdateOrderQuantity": function(order){
			console.log("Sever Update: " + order.orderId);
			var orderId = order.orderId;
			var itemId = order.itemId
			Orders.update({
					_id: orderId, 'itemsInCart.itemID': itemId
				},{$inc : {'itemsInCart.$.quantity': 1}});
		  },
		"updateOrderStatus": function(order){
				console.log("Sever Update ORder Status: " + order.orderStatus);
				var orderId = order.orderId;
				var orderStatus = order.orderStatus;
				var email = order.email;
				Orders.update({
					_id: orderId
				},{$set : {'email': email, orderStatus: orderStatus}});
				
				
				
			}
	  
	  });
}
