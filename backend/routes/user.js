const express = require("express")
const zod = require("zod");
const {User} = require("../db");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// signup Body Validation 
const signupBody = zod.object({
    username : zod.string().email(),
    password : zod.string().min(6),
    firstName : zod.string(),
    lastName : zod.string()
});

router.post("/signup",async (req,res) =>{
    //code to sign up a new user goes
    const body = req.body;
    const {success} = signupBody.safeParse(req.body);
    
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser =await User.findOne({
        username : req.body.username
    });

    if(existingUser){
        return res.status(411).json({
            message:"Email already taken / incorrect inputs"
        })
    }

    const user = await User.create({
        username:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    }) 
    const userId = user._id;

    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.json({
        message:"User Created Successfully",
        token : token
    })
})

const signinBody = zod.object({
    username : zod.string().email(),
    password : zod.string().min(6)
})

router.post("/signin",async (req,res) =>{
    const body = req.body;

    const {success} = signinBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: "User not found! Please check username or signup first."
        })
    }

    const user = await User.findOne({
        username : req.body.username,
        password : req.body.password
    });

    if(user){
        const token = jwt.sign({
            userId : user._id
        },JWT_SECRET);

        res.status(200).json({
            message:"Logged in Successfully",
            token : token
        })
        return;
    }

    res.status(411).json({
        message:"Error while logging in"
    })
})

module.exports = router;