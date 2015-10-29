/**
 * Created by Tejas on 10/24/2015.
 */

// CUSTOMER MODEL

var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
	name:{type:String,required: true},
	address: {type:String, required: true},
	created_at: {type:Date, default: Date.now}
});
mongoose.model('Customer',CustomerSchema);