import express from "express";
import { bookRoom, cancelBooking, getBookings } from "../controllers/booking.js";

const router = express.Router();

router.post("/",bookRoom);
router.post("/getbookings", getBookings);
router.post("/cancelbooking", cancelBooking);

export default router;
