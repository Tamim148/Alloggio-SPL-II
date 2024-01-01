// authRoute.js

import express from "express";
import passport from "passport";
import {
  login,
  register,
  verifyEmail,
  verifyToken,
} from "../controllers/auth.js";
import { validate, validateUser } from "../middlewares/validator.js";

const router = express.Router();

// Existing routes for local authentication
router.post("/register", validateUser, validate, register);
router.post("/login", login);
router.get("/:id/verify/:token", verifyEmail);
router.post("/token", verifyToken);

// Google OAuth2 route
router.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));


router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: "http://localhost:3000/",
		failureRedirect: "/login/failed",
	})
);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});

export default router;
