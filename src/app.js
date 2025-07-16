const express = require("express");

const app =express();

const {AdminAuth} = require("./middlewares/auth")

//Handle Auth Middlewares for request
// app.use("/admin",(req,res,next)=>{
//     console.log("Admin auth is getting checked")
//     const token = "xyz";
//     const isAdmin = token ==="xyz";
//     if (!isAdmin){
//         res.status(401).send("Unauthorized request")
//     }
//     else{
//         next();
//     }
// })

app.use("/admin",AdminAuth)

app.get("/admin/getAllData",(req,res)=>{
    res.send("All data sent")
})

app.get("/admin/deleteUser",(req,res)=>{
    res.send("Deleted a user")
})

// app.get("/user/:userId/:name/:sub",(req,res) =>{
//     console.log(req.params)
//     res.send("User")
// })

// app.get("/xy?z", (req, res) => {
//     console.log("Route /xy?z hit");
//     res.send("playing using regex");
// });


app.use("/",(req,res)=>{
    res.send("Main")
})

app.listen(3000 , ()=>{
    console.log("done")
})