const express = require("express");
const app =express();

const connectDB = require("./config/database")
const User = require("./models/user")

app.post("/signup", async (req,res) =>{
    const user = new User({
        firstName: "Anjali",
        lastName : "Robbi",
        emailId : "anjali@gmail.com",
        password : "anju123"
    });
    try{
        await user.save();
        res.send("User added successfully");
    }
    catch(err){
        res.status(400).send("Error saving the user" + err.message);
    }
    })



connectDB().then(()=>{
    console.log("Database connection established")
    app.listen(3000 , ()=>{
    console.log("done")
})
}).catch(()=>{
    console.log("Database connection failed")
})

