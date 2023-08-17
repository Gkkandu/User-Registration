const  mongoose  =require('mongoose');
//import Joi validation

const Joi= require('joi');



//create mongoose model
 const User = mongoose.model('User',{
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:20
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:5,
        maxlength:255
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:1024
        
    }
 });

 //Joi Validation

 const userValidation = (user)=>{
  const schema=Joi.object({
    name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

    password: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9!@$%&*]{3,30}$')),
    
    email: Joi.string().required()
    .email ({ minDomainSegments:2,tlds:{ allow: ['com','net'] } } )
  
});

return schema.validate(user)
}
//export default {User,userValidation};

 exports.User = User;
 exports.userValidation = userValidation;



