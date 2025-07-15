const express = require("express");

const app =express();


app.get("/user",(req,res) =>{
    res.send({fN : "Anjali" , lN: "Robbi"})
})
app.post("/user" ,(req,res)=>{
    res.send("Data saved successfully")
})
app.delete("/user" , (req,res) =>{
    res.send("Data deleted successfully");
})
app.use("/test",(req,res)=>{
    res.send("ntg")
})
app.use("/",(req,res)=>{
    res.send("Main")
})

app.listen(3000 , ()=>{
    console.log("done")
})