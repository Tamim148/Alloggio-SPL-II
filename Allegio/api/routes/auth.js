import express from "express";

import { login, register, verifyEmail } from "../controllers/auth.js";
import { validate, validateUser } from "../middlewares/validator.js";

const router=express.Router();

router.post("/register", validateUser,validate, register)
router.post("/login",login)
router.get("/:id/verify/:token",verifyEmail)

export default router