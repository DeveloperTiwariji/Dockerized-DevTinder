const jwt = require("jsonwebtoken");
const User = require("../models/user");
// const { cookie } = require("express/lib/response");


const userAuth = async (req,res, next)=>{
    try{
        // const cookie = req.cookie;
        const {token} = req.cookies;
        console.log("Auth middleware - Token present:", !!token);
        // console.log(token);
        if(!token){
            return res.status(401).send("Please login to access this resource");
        }
        const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token verified for user ID:", decodedObj._id);

        const {_id} = decodedObj;

        const user =  await User.findById(_id);

        if(!user){
            throw Error("User not found");
        }
        req.user = user;
        next();  
    }catch(err){
        console.error("Auth error:", err.message);
        res.status(400).send("Error: "+ err.message);
    }
}


module.exports ={userAuth};