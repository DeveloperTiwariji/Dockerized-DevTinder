const express = require("express");
const User = require("../models/user");
const {validateSignUpData} = require("../utils/validation");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req,res)=>{

    try {
        validateSignUpData(req);
        const {firstName, lastName, email, password} = req.body;

        const bcryptPassword = await bcrypt.hash(password, 10 );

        const user  = new User({
            firstName,
            lastName,
            email,
            password:bcryptPassword
        });
        const sinUpUser = await user.save();
        const token = await sinUpUser.getJWT();
        res.cookie("token", token, {expires: new Date(Date.now() +8*3600000)});

        res.json({message:"User created successfully", data:sinUpUser});
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error: "+ error.message);
    }
})

authRouter.post("/login", async (req,res)=>{

    const {email, password} = req.body;

    try{
        const user = await User.findOne({email:email});
        if(!user){
            throw new Error("User not found");
        }

        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){

        const token = await user.getJWT();
        
        res.cookie("token", token, {expires: new Date(Date.now() +8*3600000)});

            res.send(user);
        }else{
            throw new Error("Invalid Password");
        }

    }catch (error) {

        res.status(500).send("Error: "+ error.message);
    }
 })


 authRouter.post("/logout", (req,res)=>{
    res.cookie("token", null, {expires: new Date(Date.now())});

    res.send("Logout Successfully");
 })


module.exports = authRouter;