var db = require('../db');

var UserSchema = db.Schema({
  	username: { type: String, required: true },
  	password: { type: String, required: true , select: false },
  	address: {
	  	street: { type: String },
	  	city: { type: String },
	  	state: { type: String },
	  	zipcode: { type: String }
  	},
  	admin: { type: Boolean, default: false },
  	orders: [ 
  		{ 
  			items: [ 
  				{ 
  					id: { type: db.Schema.Types.ObjectId },
  					name: { type: String, required: true },
  					price: { type: Number, required: true },
  					quantity: { type: Number, required: true } 
  				}
  			], 
  			date: { type: Date, default: Date.now } 
  		} 
  	]
});

module.exports = db.model('User', UserSchema, 'user');
