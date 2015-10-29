var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/orders', function() {
  console.log('Mongodb connection established');
});

module.exports = mongoose;
