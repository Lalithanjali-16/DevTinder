const express = require('express')
const mongoose = require('mongoose')

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    status : {
        type: String ,
        enum : {
            values : ['ignored' , 'accepted' , 'interested','rejected'],
            message : `{VALUE} is incorrect status`
        }
    }
},{
    timestamps: true
});

connectionRequestSchema.pre("save", function(next) {
    const connectionRequest = this;

     //if from user id and to user id are same
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        return next(new Error("Cannot send connection request to yourself"));
    }
    next(); 
});


const ConnectionRequestModel = new  mongoose.model(
    "ConnectionRequest", connectionRequestSchema
)
module.exports = ConnectionRequestModel;