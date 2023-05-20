import express from "express";
import {
	createHotel,
	deleteHotel,
	getAllHotels,
	getHotel,
	updateHotel,
	countByCity,
} from "../controllers/hotel.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyAdmin, createHotel);
router.put("/:id", verifyAdmin, updateHotel);
router.delete("/:id", verifyAdmin, deleteHotel);
router.get("/find/:id", getHotel);
router.get("/", getAllHotels);

router.get("/countByCity", countByCity);

export default router;
