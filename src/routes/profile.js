const express = require('express')
const profileRouter = express.Router()
const {userAuth} = require("../middlewares/auth");
const { validateEditProfileData } = require('../utils/validation');

//profile
profileRouter.get("/profile/view",userAuth, async (req,res)=>{
    try{
        const user = req.user;        
        res.send(user)
    }catch(err){
        res.status(404).send("ERROR " + err.message)
    }
});

profileRouter.patch("/profile/edit" , userAuth , async (req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request")
        }
        const loggedInUser = req.user;
        console.log(loggedInUser)
        Object.keys(req.body).forEach((key) =>(loggedInUser[key] = req.body[key]))
        console.log(loggedInUser)

        await loggedInUser.save();
        res.json({
            message:      `${loggedInUser.firstName} , your profile updated successfully`,
            data :loggedInUser,
        })

    }catch(err){
        res.status(400).send("ERROR : "+err.message)
    }
})

module.exports = profileRouter;