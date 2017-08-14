var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/userModel');
var bcrypt = require('bcryptjs');

//For now main page is login
router.get('/', function(req, res){
  res.redirect('/login');
});

router.get('/signup', function(req, res){
  res.render('signup');
});

router.get('/signupPro', function(req, res){
  res.render('signupPro');
});

router.get('/login', function(req, res){
  res.render('login');
});

//route that handles signup
router.post('/signup', function(req, res){
  var email = req.body.email;
  User.findOne({'email': email}, function(err, user){
    if(err)
      throw err;
    if(user){
      res.redirect('/signup');
    } else {
      var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
      var newUser = new User({
        'email': email,
        'password': hash
      });
      newUser.save(function(err){
        if(err)
          throw err;
        console.log(newUser);
        res.redirect('login');
      });
    }
  });
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/home',
  failureRedirect : '/login'
}));

router.post('/logout', isLoggedIn, function(req, res){
  req.logout();
  res.redirect('/login');
})

router.get('/home', isLoggedIn, function(req, res){
  res.render('home');
});

//middlewre that checks if user is logged
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/login');
  }
}

module.exports = router;
