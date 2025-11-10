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
        
        // Set cookie with proper options
        res.cookie("token", token, {
            expires: new Date(Date.now() + 8*3600000),
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax'
        });

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
        
        // Set cookie with proper options
        res.cookie("token", token, {
            expires: new Date(Date.now() + 8*3600000),
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax'
        });

            res.send(user);
        }else{
            throw new Error("Invalid Password");
        }

    }catch (error) {

        res.status(500).send("Error: "+ error.message);
    }
 })


 authRouter.post("/logout", (req,res)=>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax'
    });

    res.send("Logout Successfully");
 })

 authRouter.post("/auth/google", async (req, res) => {
    try {
        const { email, firstName, lastName, photoUrl, googleId } = req.body;

        if (!email || !googleId) {
            return res.status(400).send("Email and Google ID are required");
        }

        // Check if user already exists
        let user = await User.findOne({ email: email });

        if (!user) {
            // Create new user with Google data
            // Generate a random password (won't be used for Google login)
            const randomPassword = await bcrypt.hash(Math.random().toString(36), 10);
            
            user = new User({
                firstName: firstName || "Google",
                lastName: lastName || "User",
                email: email,
                password: randomPassword,
                photoUrl: photoUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
                googleId: googleId,
            });

            await user.save();
        } else {
            // Update existing user with Google ID if not set
            if (!user.googleId) {
                user.googleId = googleId;
                await user.save();
            }
        }

        // Generate JWT token
        const token = await user.getJWT();
        
        // Set cookie with proper options
        res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000),
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax'
        });

        res.json({ 
            message: "Google login successful", 
            data: user 
        });

    } catch (error) {
        console.error("Google auth error:", error);
        res.status(500).send("Error: " + error.message);
    }
});


module.exports = authRouter;