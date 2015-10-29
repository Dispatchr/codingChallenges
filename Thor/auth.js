var User = require('./models/user');

module.exports = function(req, res, next) {
	if(req.session.userID) {
		User.find({ _id: req.session.userID }).exec(function(err, users) {

			if(!err && users.length) {
				req.oUser = users[0];
			}			
			
			next();
		});
	} else {
		next();
	}
}