const express = require("express");
const {userAuth} = require("../middlewares/auth");
const {validateEditProfileData} =require("../utils/validation");
const profileRouter = express.Router();
const {validateResetPasswordData} = require("../utils/validation");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req,res)=>{

    try{ 
     const user = req.user;
    //  console.log(user); 
     res.send(user);
 }catch (error) {
        
         res.status(500).send("Error: "+ error.message);
     }
 })


 profileRouter.patch("/profile/edit",userAuth, async (req, res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Not allowed to edit that field");
        }
        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key)=>(loggedInUser[key]= req.body[key]));
        await loggedInUser.save();
        res.json({
            message: `${loggedInUser.firstName}, your profile updated successfuly`,
            data: loggedInUser,
        });
    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }
 })

 profileRouter.patch("/profile/password", userAuth, async (req,res)=>{
    try{
        validateResetPasswordData(req);
        const user = req.user;
        const {password} = req.body;
        const bcryptPassword = await bcrypt.hash(password, 7);
        user.password = bcryptPassword;
        await user.save();
        res.send("Reset Password Successfuly");
    }catch(error){
        res.status(400).send("Error: "+ error.message);
    }
 })


 module.exports = profileRouter;
