import express from "express";

const router = express.Router();

// CREATE
router.post("/", (req, res) => {
    res.send("Welcome, hotels!")
})

// UPDATE
// DELETE
// GET
// GET ALL

export default router