var express =require('express');
var router = express.Router();
var passport =require('passport');

router.get('/', function(req, res) {
     //   render the page and pass in any flash data if it exists
     	    var signupMessage = req.flash("signupMessage"); 
          res.json({message:signupMessage});
          //res.json({message:req.flash('signupMessage')}); 
});



router.post('/', passport.authenticate('local-signup', {
        successRedirect : '/signup_success', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
})

);

module.exports = router;
