import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
    try{

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt); 
        const user=await User.findOne({username:req.body.email})
        if(user) return next(createError(404,"email already taken"))
      
      
        const newUser=new User({
        username:req.body.username,
        email:req.body.email,
        password:hash,
      })

      await newUser.save()
      res.status(200).send("User has been created!!!")
    }catch(err){
        next(err)
    }
  };


  export const login = async (req, res, next) => {
    try{
        
        const user=await User.findOne({username:req.body.username})
        if(!user) return next(createError(404,"User not found, please give valid values!"))
        //const useremail=await User.findOne({username:req.body.email})
       // if(!useremail) return next(createError(404,"Invalid Email!!"))
        const isPasswordCorrect= await bcrypt.compareSync(req.body.password,user.password)
        if(!isPasswordCorrect) return next(createError(400,"Incorrect password, please give valid values!"))
          

        const token = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.JWT
        );
       

        const { password, isAdmin, ...otherDetails } = user._doc;
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json({ details: { ...otherDetails }, isAdmin });
      } catch (err) {
        next(err);
      }
    };