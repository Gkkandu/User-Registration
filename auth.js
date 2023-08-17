const {User} = require('../models/user');
const express = require('express');
const bcrypt = require('bcrypt');

const _ = require('lodash');
const Joi = require('joi');
const router = express.Router();
const jwt = require('jsonwebtoken');




// Post Router

router.post('/', async (req,res)=>{
    // Validate user 
    const {error} = userValidation(req.body);

    if(error){
        res.status(404).json(error.details[0].message);
    }

    // Checking if user exists in db
    const exuser = await User.findOne({email:req.body.email});

    if(!exuser){
        res.status(404).send('User does not exists!');
    }
    
    const pass = await bcrypt.compare(req.body.password,exuser.password);
    if(pass){
        // const token = jwt.sign({_id:exuser._id},"MySecret");
        // res.json(token);
        const token = jwt.sign({_id:exuser._id},"MySecret");
        const newuser ={
            name:exuser.name,
            email:exuser.email,
            token: token
            
        }  
    
    res.json(newuser);
        
    }else{
        res.status(403).send('Password does not match!');
        //    res.json('Wrong Password');
    }
    
    //Authenticate user
    
    //Encrypt password
    //-----------------
    //const saltRounds = 10;
    //const myPlaintextPassword = req.body.password;

    //bcrypt.genSalt(saltRounds,function(err,salt){
    
    //bcrypt.hash(myPlaintextPassword,salt,function(err,hash){
    //const newuser = new User({
    //     name:req.body.name,
    //     email:req.body.email,
    //     password:hash
    // });
    //Save user in db
    //newuser.save()
        
    //        .then(result=>console.log('User Created Successfully !!'))
    //        .catch(err=>console.log(err))
    //     res.json(_.pick(newuser,['name','email']));
           
    // });
    
    //});
    
    
    })
    //  const token = jwt.sign({_id:exuser._id},"MySecret");      
    // // const token = jwt.sign({ name: 'gaurav' },{ id: user._id });
    //  res.json(token);
    const userValidation = (user)=>{
        const schema=Joi.object({
          
          email: Joi.string()
          .required()
          .email ({ minDomainSegments:2,tlds:{ allow: ['com','net'] } } ),
          password: Joi.string()
          .required()
          .pattern(new RegExp('^[a-zA-Z0-9!@$%&*]{5,30}$'))
      });
      
      return schema.validate(user)
      }

module.exports = router;
