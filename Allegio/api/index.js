import cookieParser from "cookie-parser";
import cors from "cors";
import dotnev from "dotenv";
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import authRoute from "./routes/auth.js";
import bookingsRoute from "./routes/booking.js";
import hotelsRoute from "./routes/hotels.js";
import passwordresetRoute from "./routes/password-Reset.js";
import roomsRoute from "./routes/room.js";
import usersRoute from "./routes/users.js";
import passport from "passport";
import './passport-config.js'
const app=express()
dotnev.config()
import path from 'path';
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    console.log(error);
  }
};

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(
  session({ secret: "your-secret-key", resave: true, saveUninitialized: true })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth",authRoute)
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/booking", bookingsRoute);
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