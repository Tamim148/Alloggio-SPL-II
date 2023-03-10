import cookieParser from "cookie-parser";
import cors from "cors";
import dotnev from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import passwordresetRoute from "./routes/password-Reset.js";
import roomsRoute from "./routes/room.js";
import usersRoute from "./routes/users.js";
const app=express()
dotnev.config()


const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

app.use(cookieParser());
app.use(cors());
app.use(express.json());


app.use("/api/auth",authRoute)
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/password-Reset",passwordresetRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
    connect();
    console.log("Connected to backend! made some change!!");
  });