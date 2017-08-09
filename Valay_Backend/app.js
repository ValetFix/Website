var express=require('express');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');

var db=mongoose.connect('mongodb://localhost/valayapi')

var User=require('./models/userModel');
var Contractor=require('./models/contractorModel');

var app=express();

var port=process.env.port || 3000;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

var userRouter = express.Router();
var contractorRouter=express.Router();

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
        contractorRouter.route('/contractor')
                .post(function(req,res){
                    console.log(req.body);
                    var contractor=new Contractor(req.body);
                    contractor.save();
                    console.log(contractor);
                    res.status(201).send(contractor);
                })
                .get(function(req,res){
                    console.log(req+" "+res);
                    var query={};
                    if(req.query.email){
                        query.email=req.query.email;
                    }
                    Contractor.find(query,function(err,contractors){
                        if(err){
                            res.status(500).send(err);
                            console.log(err);
                        }
                        else{
                            console.log('connected');
                            res.json(contractors);
                        }
                    })

                });
                contractorRouter.route('/contractor/:contractorid')
                        .get(function(req,res){
                            console.log(req+" "+res);
                            var query={};
                            if(req.query.email){
                                query.email=req.query.email;
                            }
                            Contractor.findById(req.params.contractorid,function(err,contractors){
                                if(err){
                                    res.status(500).send(err);
                                    console.log(err);
                                }
                                else{
                                    console.log('connected');
                                    res.json(contractors);
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

app.use('/api', userRouter);
app.use('/api', contractorRouter);

app.get('/',function(req, res){
    res.send("welcome to API!!");
})


app.listen(port, function(){
    console.log('running on Port'+port);
})
