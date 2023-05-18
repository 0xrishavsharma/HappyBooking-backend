import express from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// Check authentication
// router.get("/checkauthentication", verifyToken, (req, res) => {
//     res.status(200).json("req", req);
// })
// router.get("/checkuser/:id", verifyUser, (req, res) => {
//     res.status(200).json("You are authenticated and you can delete your account now!");
// })
// router.get("/checkadmin/:id", verifyUser, (req, res) => {
//     res.status(200).json("You are authenticated admin. You can delete any user account now!");
// })

router.put("/:id",verifyUser, updateUser)
router.delete("/:id",verifyUser, deleteUser)
router.get("/:id",verifyUser, getUser)
router.get("/",verifyAdmin, getAllUsers)

export default router