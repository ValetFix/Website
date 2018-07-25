var mongoose=require('mongoose'),
    schema=mongoose.Schema; 

var contractorModel=new schema({
    firstName: {
        type:String
    },
    lastName:{
        type:String
    },
    email: {
        type:String,
        index:{ unique: true }
    },
    password:{
        type:String
    },
    typeOfWork:{
      type:String
    }
});

module.exports=mongoose.model('Contractor',contractorModel);
