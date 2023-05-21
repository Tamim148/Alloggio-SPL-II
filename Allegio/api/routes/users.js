import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router=express.Router();



//UPDATE
router.put("/:id", verifyUser, updateUser)
  
//DELETE

router.delete("/:id", deleteUser)
//GET

router.get("/:id", verifyUser, getUser)


//GET ALL

router.post("/", verifyAdmin, getUsers)


export default router