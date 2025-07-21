const jwt = require("jsonwebtoken")
const User = require("../models/user")
const userAuth = async (req,res,next)=>{
    try {
        // Read the token from the req cookies
    
        const {token} = req.cookies;
        if(!token){
            throw new Error("Token not found")
        }
        const decodedObj = await jwt.verify(token , "DEVTinDer$0709")

        const {_id} = decodedObj;
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not found")
        }
        req.user=user;
        next();
        // Validate the token
        // Find the user}
    }catch(err){
        res.status(404).send("ERROR "+err.message);
    }
};
module.exports ={userAuth};