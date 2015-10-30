var mongoose = require('mongoose');

var listSchema = mongoose.Schema({
    title:String,
    description: String,
    price:Number,
    postedBy : String,
    postedByID: String

});

module.exports = mongoose.model('List',listSchema);
