var express =require('express');
var router = express.Router();
var passport =require('passport');

router.get('/', function(req, res) {
     //   render the page and pass in any flash data if it exists
          res.json({message:req.flash('loginMessage')}); 
});



router.post('/', passport.authenticate('local-login', {
        successRedirect : '/login_success', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
})

);

module.exports = router;
