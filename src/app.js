const express = require("express");
const app =express();

const connectDB = require("./config/database")
const User = require("./models/user")

app.use(express.json())

//signup
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

//get user by id
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


//Feed API -get all users from database if you give User.find() or selective if you give User.find({emailId: req.body.emailId})
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

//deleting a user
app.delete("/user",async (req,res) =>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId)
        res.send("User deleted successfully")
    }
    catch(err){
        res.status(404).send("Something went wrong" + err.message)
    }
})

//updating user in database
// app.patch("/user", async (req,res)=>{
//     const data = req.body;
//     const userId =  req.body.userId;
//     try{
//         const user = await User.findByIdAndUpdate({_id : userId}, data)
//         res.send("User Updated successfully")
//     }
//     catch(err){
//         res.status(404).send("Something went wrong" + err.message)
//     }
// })

//updating user in database using email
app.patch("/user",async (req,res)=>{
    const data = req.body;
    const email= req.body.emailId;
    try{
        const user =await User.findOneAndUpdate({emailId : email} ,data,{runValidators :true})
        if (!user) {
            return res.status(404).send("No user found with this email");
        }
        res.send("User with email is updated successfully")
    }
    catch(err){
        res.status(404).send("Update Failed" + err.message)
    }
})

//Connecting to database
connectDB().then(async ()=>{
    await User.init();
    console.log("Database connection established")
    app.listen(3000 , ()=>{
    console.log("done")
})
}).catch((err)=>{
    console.log("Database connection failed" + err.message)
})

