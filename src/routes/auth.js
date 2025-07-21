const express = require('express')
const authRouter = express.Router()

const User = require("../models/user")
const {validateSignUpdata} = require("../utils/validation")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//signup
authRouter.post("/signup", async (req,res) =>{
    try{
        //validating user data
        validateSignUpdata(req);
        const {firstName,lastName,emailId,password,age,gender,photoUrl,about,skills} = req.body;

        //Encrypt the password
        const passwordHash = await bcrypt.hash(password,10);

        //Creating an instance of user model
        const user = new User({
            firstName,lastName,emailId,password:passwordHash,age,gender,photoUrl,about,skills
        })

        await user.save();
        res.send("User added successfully");
    }
    catch(err){
        res.status(400).send("Error saving the user" + err.message);
    }
})

//login
authRouter.post("/login",async (req,res)=>{
    try{
        const {emailId,password}=req.body;
        const user = await User.findOne({emailId:emailId})
        if(!user){
            throw new Error("Invalid credentials")
        }
        //to check email and password
        const isPasswordValid = await user.validatePassword(password)
        if(isPasswordValid){
            //Creating a token
           const token = await user.getJWT();
            
            //Adding the token to cookie and send the response back to the user
            res.cookie("token",token, {expires: new Date (Date.now() + 604800000)});
            res.send("Login Successfully")
        }else{
            throw new Error("Invalid credentials");
        }
    }
    catch(err){
        res.status(404).send("Error logging in the user : "+ err.message)
    }
})

module.exports = authRouter;