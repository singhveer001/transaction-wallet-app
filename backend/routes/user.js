const express = require("express")
const zod = require("zod");
const {User,Account} = require("../db");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware");
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

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.json({
        message:"User Created Successfully",
        token : token,
        firstName : firstName,
        lastName : lastName
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
            token : token,
            firstName:user.firstName ? user.firstName : "",
            lastName:user.lastName ? user.lastName : ""
        })
        return;
    }

    res.status(411).json({
        message:"Error while logging in"
    })
})


// Update User Body Validation
    const updateUserBody = zod.object({
        password : zod.string().min(6),
        firstName : zod.string(),
        lastName : zod.string()
    });

    router.put('/updateUser',authMiddleware,async (req,res) => {
        try{
            const {success} = updateUserBody.safeParse(req.body);
            if(!success){
                return res.status(411).json({
                    message:"Error while updating information"
                })
            } 

            const updatedUser = await User.updateOne({ _id: req.userId }, req.body)
            console.log(updatedUser)
            
            res.status(200).json({ 
                message: 'Successfully Updated!' 
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server Error" });
        }
    })


    router.get("/bulk", async (req, res) => {
        try{
        const filter = req.query.filter || "";
    
        const users = await User.find({
            $or: [{
                firstName: {
                    "$regex": filter
                }
            }, {
                lastName: {
                    "$regex": filter
                }
            }]
        })
    
        res.json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })
    }catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    })
    
module.exports = router;