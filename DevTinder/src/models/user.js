const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        index:true,
        minlength:4,
        maxlength:20,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid");
            }
        }

    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:128,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password");
            }
        }
        
    },
    age:{
        type:Number,
        min:18,
        max:100,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender Data is not valid");
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Photo URL is not valid");
            }
        }

    },
    about:{
        type:String,
        default: "I am default user",
        maxlength:500,
    },
    skills:{
        type:[String],
    }
}, {timestamps:true});


userSchema.methods.getJWT = async function() {
    const user = this;

    try{const token = await jwt.sign({_id:user._id},"Sattu01@A", {expiresIn:"7d"});
    return token;}catch(err){
        throw new Error("Error generating JWT: "+ err.message);
    }
}


userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;
    


    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isPasswordValid;
}


const User = mongoose.model("User", userSchema);
module.exports  =User;