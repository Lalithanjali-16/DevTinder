const express = require("express");
const app =express();

const connectDB = require("./config/database")
const User = require("./models/user")
const {validateSignUpdata} = require("./utils/validation")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser");

app.use(express.json())
app.use(cookieParser());

//signup
app.post("/signup", async (req,res) =>{
    try{
        //validating user data
        validateSignUpdata(req);

        const {firstName, lastName, emailId, password, age, gender, photoUrl, about, skills} = req.body;

        //Encrypt the password
        const passwordHash = await bcrypt.hash(password,10);

        //Creating an instance of user model
        const user = new User({
            firstName,lastName,emailId,password:passwordHash,age,gender,photoUrl,about,skills
        })

        await user.save();
        res.send("User added successfully");
    }
    catch(err){
        res.status(400).send("Error saving the user" + err.message);
    }
})

//login
app.post("/login",async (req,res)=>{
    try{
        const {emailId,password}=req.body;
        const user = await User.findOne({emailId:emailId})
        if(!user){
            throw new Error("Invalid credentials")
        }
        //to check email and password
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(isPasswordValid){
            //Creating a token
           const token = await jwt.sign({ _id : user._id }, "DEVTinDer$0709");
            
            //Adding the token to cookie and send the response back to the user
            res.cookie("token",token);
            res.send("Login Successfully")
        }else{
            throw new Error("Invalid credentials");
        }
    }
    catch(err){
        res.status(404).send("Error logging in the user : "+ err.message)
    }
})

//profile
app.get("/profile", async (req,res)=>{
    try{
        const cookies = req.cookies
        const {token} = cookies

        //Verify my token
        const decodedMessage = await jwt.verify(token,"DEVTinDer$0709")
        
        const {_id} = decodedMessage;
        
        const user = await User.findById(_id);

        if(!user){
            throw new Error("User does not exist");
        }
        
        res.send(user)
    }catch(err){
        res.status(404).send("ERROR " + err.message)
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
app.patch("/user", async (req, res) => {
    const data = req.body;
    const userId = req.body.userId;
    const ALLOWED_UPDATES = ["skills", "about", "photoUrl", "age"];

    // Ignore userId while validating update fields
    const updateKeys = Object.keys(data).filter((key) => key !== "userId");

    try {
        const isUpdateAllowed = updateKeys.every((key) =>
            ALLOWED_UPDATES.includes(key)
        );

        if (!isUpdateAllowed) {
            throw new Error("Update not allowed");
        }

        const user = await User.findByIdAndUpdate(userId, data, {
            runValidators: true,
            new: true,
        });

        if (!user) {
            return res.status(404).send("No user found with this userId");
        }

        res.send("User with userId is updated successfully");
    } catch (err) {
        res.status(400).send("Update Failed: " + err.message);
    }
});



//updating user in database using email
// app.patch("/user",async (req,res)=>{
//     const data = req.body;
//     const email= req.body.emailId;
//     try{
//         const ALLOWED_UPDATES = ["skills","about","photoUrl","about","age"]
//         const isUpdateAllowed = Object.keys(data).every((k) => 
//         ALLOWED_UPDATES.includes(k));
//         if(!isUpdateAllowed){
//             throw new Error("Update not allowed")
//         }
//         const user =await User.findOneAndUpdate({emailId : email} ,data,{runValidators :true})
//         if (!user) {
//             return res.status(404).send("No user found with this email");
//         }

        
//         res.send("User with email is updated successfully")
//     }
//     catch(err){
//         res.status(404).send("Update Failed" + err.message)
//     }
// })

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

