const express = require("express");
const app =express();

const User = require("./models/user");
const connectDB = require("./config/database")
const cookieParser = require("cookie-parser");
const cors = require("cors")

app.use(cors( {
    origin : "http://localhost:5173",
    credentials : true
}))
app.use(express.json())
app.use(cookieParser());

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/requests")
const userRouter = require("./routes/user")

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)

connectDB().then(async ()=>{
    await User.init();
    console.log("Database connection established")
    app.listen(3000 , ()=>{
    console.log("done")
})
}).catch((err)=>{
    console.log("Database connection failed " + err.message)
})

