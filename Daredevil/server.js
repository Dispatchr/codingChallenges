/**
 * Created by Tejas on 10/24/2015.
 */
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

// mongoose
var config_mongoose = require('./server/config/mongoose');

app.use(bodyParser.json());

// set path to static folder
app.use(express.static(path.join(__dirname,'./client')));


// require routes config and run
require('./server/config/routes')(app);

//listen on port 3030
var port = process.env.PORT || 3030;
var server = app.listen(port,function() {
	console.log("listening on port 3030");
});