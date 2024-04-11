const mongoose = require("mongoose");
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)

// Create a Schema for Users

const userSchema = mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,       
        minLength:3,
        maxLength:30    
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    }
});

// Create a model for Schema

const User = mongoose.model("User",userSchema);

module.export = {
    User
}