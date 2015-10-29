var db = require('../db');

var ItemSchema = db.Schema({
  	name: { type: String, required: true },
  	price: { type: Number, default: 0 },
  	tags: [String]
});

ItemSchema.path('tags').set(function(value) {
	
	if(Array.isArray(value)) return value;

	return value.split(',').map(function(tag) { return tag.trim().toLowerCase() });
	
});

ItemSchema.path('tags').get(function(value) {
	return value.join(',');
});

ItemSchema.path('price').set(function(value) {
	return +value; // Cast to Number if so needed
});

module.exports = db.model('Item', ItemSchema, 'item');
