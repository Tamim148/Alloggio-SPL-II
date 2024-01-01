import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    
    password: {
      type: String,
      // required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    verified:{
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String,
    },
  },
  
  { timestamps: true }
);


UserSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWT, {
		expiresIn: "7d",
	});
	return token;
};


export default mongoose.model("User", UserSchema);


export const validate = (data) => {
	const schema = Joi.object({
		username: Joi.string().required().label("username"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().label("Password"),
	});
	return schema.validate(data);
};



//module.exports = { User, validate };