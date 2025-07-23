const express = require('express')
const requestRouter = express.Router()
const {userAuth} = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest")

//sendConnectionRequest
requestRouter.post("/request/send/:status/:toUserId", userAuth,async(req,res)=>{
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        
        const allowedSatus = ["interested" , "ignored"]
        if(!allowedSatus.includes(status)){
            return res.status(400).json({message : "Invalid status : "+status})
        }
        //if there is an existing connectionRequest
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or : [
                {fromUserId, toUserId},
                {fromUserId : toUserId, toUserId : fromUserId}
            ]
            
        })

        if(existingConnectionRequest){
            return res.status(400).send("Connection request already sent")
        }
        const connectionRequest = new ConnectionRequest({
            fromUserId,toUserId,status
        })
        const data = await connectionRequest.save()
        res.json({
            message : "Connection Request Sent successful",
            data,
        })
    }catch(err){
        res.status(404).send("Connection Request failed")
    }
})
module.exports = requestRouter;