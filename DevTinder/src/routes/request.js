const express = require("express");
const {userAuth} = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequests");
const requestRouter = express.Router();
const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res)=>{

    try{
        const fromeUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["interested","ignored"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Invalid stauts type: "+ status});
        }

        const toUser  = await User.findById(toUserId);

        if(!toUser){
            return res.status(404).json({message: "User not found!!"});
        }


        const existingConnectionRequest = await connectionRequest.findOne({
            $or:[
                {fromeUserId, toUserId},
                {fromeUserId: toUserId, toUserId:fromeUserId},
            ],
        })

        if(existingConnectionRequest){
            return res.status(400).json({message: "Connection Request Already Exists!!"});
        }


        const connectionRequestData =  new connectionRequest({
            fromeUserId,
            toUserId,
            status,
        });

        const data = await connectionRequestData.save();
        
        const emailRes = await sendEmail.run("A new friend request from "+req.user.firstName ,req.user.firstName+" is "+status+ " to "+toUser.firstName);
        console.log(emailRes);

        res.json({
            message: req.user.firstName+" is "+status+ " to "+toUser.firstName,
            data:data,
        })

 
    }catch(err){
        res.status(400).send("Error: "+ err.message)
    }
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res)=>{
    try{

        const loggedInUser = req.user;
        const allowedStatus = ["accepted", "rejected"];
        const {status, requestId} = req.params;
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Status " + status+ " not allowed"});
        }

        const connectionReqest = await connectionRequest.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status: "interested"
        });

        if(!connectionReqest){
            return res.status(404).json({
                message: "Connection reques not found"
            });
        }

        connectionReqest.status = status;
        const data = await connectionReqest.save();
        res.json({
            message: "Connection request "+status, data
        });
    }catch(error){
        res.status(400).send("Error: "+ error.message);
    }
})
  


module.exports = requestRouter;