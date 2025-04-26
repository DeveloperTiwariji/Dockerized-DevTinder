const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const connectionReqest = require("../models/connectionRequests");
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName age gender skills photoUrl about";
userRouter.get("/user/requests/received", userAuth, async (req,res)=>{
    try{
        const loggedInUser = req.user;
        const connectionReqests = await connectionReqest.find({
           toUserId:loggedInUser._id,
           status:"interested", 
        }).populate("fromeUserId", USER_SAFE_DATA);
    
        res.json({
            message: "Data fetched successfully",
            data:connectionReqests,
        });
    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }
});

userRouter.get("/user/connections", userAuth, async (req, res)=>{
    try{
        const loggedInUser = req.user;

        const connectionReqests = await connectionReqest.find({
            $or:[
                {fromeUserId:loggedInUser._id, status:"accepted"},
                {toUserId:loggedInUser._id, status: "accepted"},
            ]
        }).populate("fromeUserId", USER_SAFE_DATA ).populate("toUserId", USER_SAFE_DATA);

        const data = connectionReqests.map((row)=> {
            if(row.fromeUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromeUserId;
        });

        res.json({data});
    }catch(err){
        res.status(400).send("Error: "+err.message);
    }
});

userRouter.get("/feed", userAuth, async (req,res)=>{
    try{
        const loggedInUser = req.user;

        const page = parseInt(req.query.page)|| 1;
        let  limit = parseInt(req.query.limit) || 10;
        const skip = (page-1)*limit;

        limit = limit>50 ? 50 : limit;





        const connectionReqests = await connectionReqest.find({
            $or:[
                {fromeUserId: loggedInUser._id},{toUserId: loggedInUser._id}
            ]
        }).select("fromeUserId toUserId")

        const hideUsersFromFeed = new Set();
        connectionReqests.forEach((req)=>{
            hideUsersFromFeed.add(req.fromeUserId.toString())
            hideUsersFromFeed.add(req.toUserId.toString())
        });


        const users = await User.find({
            $and: [
                {_id: {$nin: Array.from(hideUsersFromFeed)}},
                {_id: {$ne: loggedInUser._id}},
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);
        res.send(users);
    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }
})


module.exports = userRouter;