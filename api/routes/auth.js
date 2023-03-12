import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello, this is authentication endpoint!")
})
router.get("/register", (req, res) => {
    res.send("Registration, welcome welcome!")
})

export default router