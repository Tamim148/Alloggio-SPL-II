import express from "express";
import { bookRoom, cancelBooking, getAllBookings, getBookings } from "../controllers/booking.js";

const router = express.Router();

router.post("/",bookRoom);
router.post("/getbookings", getBookings);
router.post("/cancelbooking", cancelBooking);
router.get("/getallbookings", getAllBookings);
export default router;
