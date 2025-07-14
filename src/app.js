const express = require("express");

const app =express();

app.use("/home", (req,res) =>{
    res.send("Hello")
})
app.use((req,res)=>{
    res.send("home")
})
app.listen(3000 , ()=>{
    console.log("done")
})