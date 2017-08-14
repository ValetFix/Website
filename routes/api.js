var express = require('express');
var userRouter = express.Router();
var User = require('../models/userModel');

  userRouter.route('/users')
          .post(function(req,res){
              console.log(req.body);
              var user=new User(req.body);
              user.save();
              console.log(user);
              res.status(201).send(user);
          })
          .get(function(req,res){
              console.log(req+" "+res);
              var query={};
              if(req.query.email){
                  query.email=req.query.email;
              }
              User.find(query,function(err,users){
                  if(err){
                      res.status(500).send(err);
                      console.log(err);
                  }
                  else{
                      console.log('connected');
                      res.json(users);
                  }
              })

          });


  userRouter.route('/users/:userId')
          .get(function(req,res){
              console.log("hii"+req.params.userId);
              // var query={};
              // if(req.query.userId){
              //     query.email=req.query.email;
              // }
              User.findById(req.params.userId,function(err,user){
                  if(err){
                      res.status(500).send(err);
                      console.log(err);
                  }
                  else{
                      console.log('connected');
                      res.json(user);
                  }
              })

          });

module.exports = userRouter;
