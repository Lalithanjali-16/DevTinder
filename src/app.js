const express = require("express");

const app =express();


app.get("/user/:userId/:name/:sub",(req,res) =>{
    console.log(req.params)
    res.send("User")
})

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