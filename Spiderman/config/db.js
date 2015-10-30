var mongoose = require("mongoose");
var conn = mongoose.connection;
var uri="mongodb://heroku_0w5j528w:8pbqe30qn5lnuho0hh7jqfcke3@ds045064.mongolab.com:45064/heroku_0w5j528w"
//uncomment the below line if you have mongo running locally 
// var uri="mongodb://localhost/marketapp"
conn.on('error',console.error.bind(console,"mongoose connection error"));
conn.once('open',function(){
  console.log("connected to "+ uri);
});

mongoose.connect(uri);
module.exports =conn;
