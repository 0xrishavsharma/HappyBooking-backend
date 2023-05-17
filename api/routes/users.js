import express from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// Check authentication
router.get("/checkauthentication", verifyToken, (req, res) => {
    res.status(200).json("req", req);
})
router.get("/checkuser/:id", verifyUser, (req, res) => {
    res.status(200).json("Hey there, you are authenticated and you can delete your account now!");
})

router.put("/:id", updateUser)
router.delete("/:id", deleteUser)
router.get("/:id", getUser)
router.get("/", getAllUsers)

export default router