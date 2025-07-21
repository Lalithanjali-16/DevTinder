const express = require('express')
const requestRouter = express.Router()
const {userAuth} = require("../middlewares/auth")

//sendConnectionRequest
requestRouter.post("/sendConnectionRequest", userAuth,async(req,res)=>{
    const user =req.user;
    res.send(user.firstName + " Connection sent successful")
})
module.exports = requestRouter;