var express = require('express');
var router = express.Router();
var path = require('path');
var List= require('../models/list.js');
var googleImages =  require('google-images');
/* GET home page. */
router.get('/', function(req, res, next) {
  var options = {
    root: path.join(__dirname + '/../views'),
    dotfiles: 'deny',
  };
  res.render('index',{ message: req.flash('signupMessage') });
  // res.render('index', { title: 'Express' });
});

router.get('/login_success', function(req, res) {
  //   render the page and pass in any flash data if it exists
  res.json({success:req.user.local.email}); 
});

router.get('/getUserData', function(req, res) {
  //   render the page and pass in any flash data if it exists
  res.json(req.user); 
});

router.get('/delete/:id',function(req,res){
  console.log(req.params.id);  
  List.remove({ _id: req.params.id }, function(err) {
    if (!err) {
      List.find({}, function(err,response){
        if(response.length != 0){

          res.json(response); 
      console.log("deleted");    
        }
        else{
          res.json([
            {
              price:"100",
              description:"fake data cannot be deleted login and list as admin first",
              title:"product 1"
            },
            {
              price:"100",
              description:"fake data cannot be deleted login and list as admin first",
              title:"product 2"
            },
            {
              price:"100",
              description:"fake data cannot be deleted login and list as admin first",
              title:"product 3"
            },
            {
              price:"100",
              description:"fake data cannot be deleted login and list as admin first",
              title:"product 4"
            },
            {
              price:"100",
              description:"fake data cannot be deleted login and list as admin first",
              title:"product 5"
            }
          ]);
        }
      });    
    }
    else {
      console.log(err);    
    }
  }); 
  // List.remove({
  //   _id : req.params._id
  // }, function(err, stuff) {
  //   if (err){
  //     res.send(err);
  //   }
  //   if(stuff){
  //   console.log(stuff);
  //   }
  //   res.json(stuff);
  //   // get and return all the todos after you create another
  // }); 
})

router.get('/getPosts', function(req, res) {
  //   render the page and pass in any flash data if it exists
  List.find({}, function(err,response){
    if(response.length != 0){

      res.json(response); 
    }
    else{
      res.json([
        {
          price:"100",
          description:"fake data cannot be deleted login and list as admin first",
          title:"product 1"
        },
        {
          price:"100",
          description:"fake data cannot be deleted login and list list as admin first",
          title:"product 2"
        },
        {
          price:"100",
          description:"fake data cannot be deleted login and list as admin first",
          title:"product 3"
        },
        {
          price:"100",
          description:"fake data cannot be deleted login and list  as admin first",
          title:"product 4"
        },
        {
          price:"100",
          description:"fake data cannot be deleted login and list as admin first",
          title:"product 5"
        }
      ]);
    }
  });    
});

router.post('/postObject', function(req, res) {
  //   render the page and pass in any flash data if it exists
  List.findOne({'title':req.body.title}, function(err,listObject){
    if(err){
      return err;
    }
    if(listObject){
      res.json({message:"There is already an object with this title"})
    }
    else{
      console.log(req.user);
      var newListObject = new List();
      newListObject.title =req.body.title;
      newListObject.description = req.body.description;
      newListObject.price = req.body.price;
      newListObject.postedBy = req.user.local.firstName + " " + req.user.local.lastName;
      newListObject.postedByID = req.user._id;
      newListObject.save(function(err){
        if(err)
          throw err;
        res.json({success:"successfully saved"})
      })
    }

  })
});

router.get('/itempage', function(req, res) {
  console.log(req.query.id);
  List.findOne({_id: req.query.id}, function(err,listItem){
    if(listItem){
      googleImages.search(listItem.title, function(err,images){
      res.render('itempage',{item: listItem, imageUrl:images[0]["unescapedUrl"]});
        });
    }
    else{
      res.redirect('/');
    }
  });
  
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/signup_success', function(req, res) {
  //   render the page and pass in any flash data if it exists

  res.json({success:req.user.local.email}); 
});


module.exports = router;
