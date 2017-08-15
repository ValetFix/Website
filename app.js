var express = require('express');
var session = require('express-session');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;
var db = mongoose.connect('mongodb://admin:password@ds125113.mlab.com:25113/valaysite', { useMongoClient: true });

var app = express();
var port = process.env.PORT || 3000;

var User = require('./models/userModel');
var Contractor = require('./models/contractorModel');

// Passport config, required for passport
passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});

//declare new passport local strategy for login
passport.use('local-login',new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
}, function(req, email, password, done){
  //covert stri
  if(email)
    email = email.toLowerCase();
  //check if email already exists
  User.findOne({'email': email}, function(err, user){
    if(err) {
      throw err;
    }
    if(!user){
      throw err;
    }
    if(bcrypt.compareSync(password, user.password)){
      if(err){
        throw err;
      }
      return done(null, user);
    } else {
      throw err;
    }
  });
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'valaysecret183', saveUninitialized: true, resave: true  }));
app.use(express.static(path.join(__dirname, 'views')));
// Init passport
app.use(passport.initialize());
app.use(passport.session());

var routes = require('./routes/routes');
var api = require('./routes/api');

app.use('/', routes);
app.use('/api', api);

app.listen(port, function(){
    console.log('running on Port '+ port);
});
