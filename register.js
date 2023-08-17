const {User, userValidation} = require('../models/user');
const express = require('express');
const bcrypt = require('bcrypt');

const _ = require('lodash');
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

    if(exuser){
        
         res.status(403).send('User already exists!');
    }
      
    //Registration
    
    //Encrypt password
    //-----------------
    const saltRounds = 10;
    const myPlaintextPassword = req.body.password;
    bcrypt.genSalt(saltRounds,function(err,salt){
    
    bcrypt.hash(myPlaintextPassword,salt,function(err,hash){
    const newuser = new User({
        name:req.body.name,
        email:req.body.email,
        password:hash
    });
    //Save user in db
    newuser.save()
    const _token = jwt.sign({_id:newuser._id},"MySecretKey");
        ///   .then(result=>console.log('User Created Successfully !!'))
        //    .catch(err=>console.log(err))
    resuser= _.pick(newuser,['name','email'])
    resuser.token=_token;res.json(resuser);    
           //lodash
        /// res.json(_.pick(newuser,['name','email']));
        
        
    //     const exuser={
    //     name:newuser.name,
    //     email:newuser.email,
    //     token:token
    //    }  
    //     res.json(exuser);
    });
    
    });
    
    
    })

module.exports = router;
