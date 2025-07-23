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
const ConnectionRequestModel = new  mongoose.model(
    "ConnectionRequest", connectionRequestSchema
)
module.exports = ConnectionRequestModel;