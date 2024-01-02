import express from "express";
import path from 'path'; // Add this line to import the 'path' module
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import { upload } from "../middlewares/multer-config.js";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const router = express.Router();

// CREATE
router.post('/',  upload.array('photos', 5), createHotel);
router.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// UPDATE
router.put("/:id", updateHotel);

// DELETE
router.delete("/:id", deleteHotel);

// GET
router.get("/find/:id", getHotel);

// GET ALL
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;
