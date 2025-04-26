const validator = require("validator");

const validateSignUpData  = (req)=>{
    const {firstName, lastName, email, password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is required");
    }else if(firstName.lenth<4 || lastName.lenth<4 || firstName.length>20 || lastName.length>20){
        throw new Error("Name should be between 4 and 20 characters");
    }
    if(!validator.isEmail(email)){
        throw new Error("Email is not valid");
    }

    if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password");
    }

}



const validateEditProfileData = (req)=>{
    const editAllowedData = ["firstName", "lastName", "age", "about", "photoUrl", "skills","gender"];
    
    const allowedData = Object.keys(req.body).every((field) => editAllowedData.includes(field));
    return allowedData;
}


const validateResetPasswordData = (req)=>{
    const {email, password} = req.body;
    if(!validator.isEmail(email)){
        throw new Error("Email is not valid!! Please Enter Correct mail");
    }

    if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong!! please Enter strong password");
    }
}

module.exports = {validateSignUpData, validateEditProfileData,validateResetPasswordData};