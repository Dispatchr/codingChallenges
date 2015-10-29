/**
 * Created by Tejas on 10/24/2015.
 */

// ORDER MODEL

var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
	name:String,
	product:String,
	quantity:Number,
	created_at: {type:Date, default: Date.now}
});
mongoose.model('Order',OrderSchema);