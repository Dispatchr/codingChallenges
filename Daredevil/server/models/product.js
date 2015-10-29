/**
 * Created by Tejas on 10/24/2015.
 */

// PRODUCT MODEL

var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
	name:String,
	image:String,
	inventory:Number,
	description:String,
	created_at: {type:Date, default: Date.now}
});
mongoose.model('Product',ProductSchema);