import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import orderRoute from "./routes/order.route.js";
import isAuthenticated from "./middlewares/isAuthenticated.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:8000",
  "http://localhost:3000",
  "http://localhost:5000",
  process.env.CLIENT_URL, // Add production frontend URL
];

// More permissive CORS configuration (TEMPORARY FOR TESTING ONLY)
app.use(
  cors({
    origin: allowedOrigins, // Allow all origins
    credentials: true, // Allow credentials
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

const PORT = process.env.PORT || 3000;
connectDB();

// middleware
// eg. http://localhost:8000/api/v1/user
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase",isAuthenticated, orderRoute);
app.use("/api/v1/progress", courseProgressRoute);

// app.get('/',(req,res)=>{
//   res.send("Welcome to LMS backend")
// })

app.listen(PORT, () => {
  console.log(`Server is litening on ${PORT}`);
});
