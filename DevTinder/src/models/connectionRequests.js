const mongoose = require("mongoose");


const connectionRequestSchema = mongoose.Schema({
    fromeUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",  // reference to the user collection
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    status:{
        type: String,
        required:true,
        enum:{
        values:["ignored","interested","accepted","rejected"],
        message: `{VALUE} is incorrect status type`,
        }
    }
}, {timestamps:true});


connectionRequestSchema.index({fromeUserId: 1, toUserId: 1});

connectionRequestSchema.pre("save",function(next){
    const connectionReqest = this;
    if(connectionReqest.fromeUserId.equals(connectionReqest.toUserId)){
        throw new Error("you Con't send Connection Request ot yourself!");
    }
    next();
})


const ConnectionRequestModel = new mongoose.model("ConnectionRequestModel", connectionRequestSchema);
module.exports = ConnectionRequestModel;