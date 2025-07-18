const express = require("express");
const app =express();

const connectDB = require("./config/database")
const User = require("./models/user")

app.use(express.json())


app.post("/signup", async (req,res) =>{
    const user = new User(req.body);
    try{
        await user.save();
        res.send("User added successfully");
    }
    catch(err){
        res.status(400).send("Error saving the user" + err.message);
    }
})

app.get("/user", async (req,res) => {
    const userEmail = req.body.emailId;
    try{
        const user = await User.findOne({emailId: userEmail})
        if (!user){
            res.status(404).send("No user found")
        }
        else{
            res.send(user)
        }
        // const users = await User.find({emailId : userEmail})
        // if(users.length === 0){
        //     res.status(404).send("User not found");
        // }else{
        //     res.send(users);
        // }
    }
    catch(err){
        res.status(404).send("Something went wrong" + err.message)
    }
});

app.get("/feed", async (req,res) =>{
    const userEmail = req.body.emailId;
    try{
        const users = await User.find({emailId: userEmail})
        if(users.length === 0){
            res.status(404).send("User not found");
        }else{
            res.send(users);
        }
    }
    catch(err){
        res.status(404).send("Something went wrong" + err.message)
    }
    
})

connectDB().then(()=>{
    console.log("Database connection established")
    app.listen(3000 , ()=>{
    console.log("done")
})
}).catch((err)=>{
    console.log("Database connection failed" + err.message)
})

