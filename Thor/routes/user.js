var router = require('express').Router(),
	config = require('../config'),
	crypto = require('crypto'),
	User = require('../models/user');

var hashPassword = function(rawPassword) {
	var hasher = crypto.createHash(config.hashAlgorithm);
	return hasher.update(rawPassword).digest('hex');	
}

router.post('/register', function(req, res) {
	
	var oUser = new User(req.body);

	oUser.password = hashPassword(oUser.password);
	
	oUser.save(function(err, user) {
		req.session.userID = user._id;
		res.status(200).send({ 
			bSuccess: true, 
			bMessage: "Registration successful", 
			bAdmin: user.admin, 
			sUsername: user.username 
		});
	});

});

router.post('/login', function(req, res) {

	var hashedPassword = hashPassword(req.body.password);

	User.find({ username: req.body.username, password: hashedPassword }, function(err, users) {

		// error checking here
		if(err || !users.length) {
			console.log('Error logging in:', err, users);
			return res.send({bSuccess: false, bMessage: 'Login unsuccessful'});
		}

		var user = users[0];
		req.session.userID = user._id;
		res.send({ bSuccess: true, bMessage: 'Login successful', bAdmin: user.admin, sUsername: user.username });

	});
	
});

router.delete('/', function(req, res) {

	req.session.destroy(function(err) {
		
		if(err){
			console.log('Error logging out:', err);
			res.send({ bSuccess: false, bMessage: 'Logout unsuccessful' });
		} else {
			res.send({ bSuccess: true, bMessage: 'Logout successful' });
		}
	});

});








module.exports = router;