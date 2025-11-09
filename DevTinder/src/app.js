const express = require("express");
const connectDB =require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compression = require("compression");

app.use(compression());

require('dotenv').config();


// app.use(cors({ origin: true, credentials: true }));


app.use(cors({
    origin: ["http://localhost:5173", "http://13.235.214.25:5173", "http://13.235.214.25"],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Health check endpoint for monitoring
app.get("/api/health", (req, res) => {
    res.status(200).json({ 
        status: "healthy", 
        service: "devtinder-api",
        timestamp: new Date().toISOString()
    });
});

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");



 

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB().then(()=>{
    console.log("Connected to the database");
    app.listen(process.env.PORT, ()=>{
        console.log("Server is running on port 3000");
        
    });
}).catch((err)=>{
    console.log(err);
    console.error("Error connecting to the database");
})

// app.listen(process.env.PORT, ()=>{
//     console.log("Server is running on port 3000");
    
// });

