import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import Token from "../models/token.js";
import User from "../models/User.js";
import { createError } from "../utils/error.js";
import { sendEmail } from "../utils/sendEmail.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    let user = await User.findOne({ email: req.body.email });
    if (user) return next(createError(404, "email already taken"));

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    user = await newUser.save();

    const token = new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });

    await token.save();

    const url = `${process.env.BASE_URL}auth/${user.id}/verify/${token.token}`;
    await sendEmail(user.email, "Verify Email", url);

    res.status(200).send("An Email sent to your account please verify");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return next(
        createError(404, "User not found, please give valid values!")
      );
   
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(
        createError(400, "Incorrect password, please give valid values!")
      );

   

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res.status(200).json({ details: { ...otherDetails }, isAdmin, token });
  } catch (err) {
    next(err);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    await User.updateOne({ _id: user._id }, { $set: { verified: true } });
    await Token.deleteOne(token);

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const verifyToken = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.JWT);
    // check if the token expired n jwt
    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({
        message: "Token expired",
      });
    }

    const user = await User.findById(decoded.id);

    // if the token is valid
    return res.status(200).json({
      message: "Token verified",
      user: {
        _id: user._id,
        createdAt: user.createdAt,
        email: user.email,
        verified: user.verified,
        username: user.username,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(401).send({ message: "Invalid Token" });
  }
};


export const loginwithgoogle = async (req, res) => {
  try {
    
    console.log("hi ");
    const token = jwt.sign(
      { id: req.user._id, isAdmin: req.user.isAdmin },
      process.env.JWT
    );
     console.log(token);
     localStorage.setItem("token", token);
    const { password, isAdmin, ...otherDetails } = req.user._doc;
    res.status(200).json({ details: { ...otherDetails }, isAdmin, token });
  } catch (err) {
    console.log(err);
  }
};


