const express = require("express");

const app =express();



app.use("/admin",AdminAuth)

app.get("/admin/getAllData",(req,res)=>{
    try{
        throw new Error("error is found")
        res.send("Failed")
    }catch(err){
        res.status(500).send("Error found")
    }
})

//Error handling

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("something went wrong")
    }
})

app.listen(3000 , ()=>{
    console.log("done")
})