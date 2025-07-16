const AdminAuth = (req,res,next)=>{
    console.log("Admin auth is getting checked")
    const token = "xyz";
    const isAdmin = token ==="xyz";
    if (!isAdmin){
        res.status(401).send("Unauthorized request")
    }
    else{
        next();
    }
}

module.exports ={AdminAuth};