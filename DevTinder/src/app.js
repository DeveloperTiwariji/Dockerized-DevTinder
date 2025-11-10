const express = require("express");
const connectDB =require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compression = require("compression");

app.use(compression());

require('dotenv').config();


// app.use(cors({ origin: true, credentials: true }));


// Dynamic CORS configuration for production and development
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174"
];

// In production, add the EC2 public IP or domain
if (process.env.NODE_ENV === 'production' && process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Check if the origin is in the allowed list
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
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



 

app.use("/api", authRouter);
app.use("/api", profileRouter);
app.use("/api", requestRouter);
app.use("/api", userRouter);

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

