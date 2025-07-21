const express = require('express')
const profileRouter = express.Router()
const {userAuth} = require("../middlewares/auth")

//profile
profileRouter.get("/profile/view",userAuth, async (req,res)=>{
    try{
        const user = req.user;        
        res.send(user)
    }catch(err){
        res.status(404).send("ERROR " + err.message)
    }
})
module.exports = profileRouter;