const express = require('express');
//Requiring mongoose
const mongoose = require('mongoose');
const registeruser = require('./routes/register');
const authuser = require('./routes/auth');

const app = express();

// making mongoose connection

mongoose.connect('mongodb://127.0.0.1:27017/mydb')
        .then(result=>console.log('connected !!'))
        .catch(err=>console.log(err))
        
app.use(express.json());

app.use('/api/register',registeruser);
app.use('/api/auth',authuser);

    // app  Listner
app.listen(9000, () => {
    console.log("mongoose running on 9000 port");
    
});