const express = require('express')
const requestRouter = express.Router()
const {userAuth} = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")

//sendConnectionRequest
requestRouter.post("/request/send/:status/:toUserId", userAuth,async(req,res)=>{
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        
        //should only allow interested and ignores status
        const allowedStatus = ["interested" , "ignored"]
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message : "Invalid status : "+status})
        }

        //if touser doesn't exists
        const toUser = await User.findById(toUserId)
        if(!toUser){
            return res.status(404).json({message : "User not found!"})
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
            message : req.user.firstName + " is " + status + " in " + toUser.firstName ,
            data,
        })
    }catch(err){
        res.status(404).send("Connection Request failed :  "+ err.message)
    }
})

requestRouter.post("/request/review/:status/:requestId" , userAuth , async(req,res) =>{
    try{
        const loggedInUser = req.user;
        const {status,requestId} = req.params;

        const allowedStatus = ["accepted" , "rejected"]
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message : "Status not allowed" })
        }
        const connectionRequest = await ConnectionRequest.findOne({
            _id : requestId,
            toUserId : loggedInUser._id,
            status : "interested"
        });
        if(!connectionRequest){
           return  res.status(404).json({message : "Connection request not found"});

        }
        connectionRequest.status=status;
        const data = await connectionRequest.save()
        res.json({message : "Connection request " + status , data})

    }
    catch(err){
        return res.status(400).send(" Error " + err.message)
       
    }
})
module.exports = requestRouter;