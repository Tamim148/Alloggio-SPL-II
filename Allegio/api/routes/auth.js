// authRoute.js

import express from "express";
import passport from "passport";
import {
  login,
  register,
  verifyEmail,
  verifyToken,loginwithgoogle
} from "../controllers/auth.js";
import { validate, validateUser } from "../middlewares/validator.js";

const router = express.Router();

// Existing routes for local authentication
router.post("/register", validateUser, validate, register);
router.post("/login", login);
router.get("/:id/verify/:token", verifyEmail);
router.post("/token", verifyToken);

// Google OAuth2 route
router.get("/google-login-success", (req, res) => {
	// Ensure that the user information is sent in the response
	res.status(200).json({
	  error: false,
	  message: "Successfully logged in with Google",
	  user: req.user,
	});
  });



router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));


router.get(
	"/google/callback",
	passport.authenticate("google"),
	loginwithgoogle
);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});




export default router;
