import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";

const app = express();
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB")
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Disconnected :(")
})
mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected :)")
})

// Creating an API
app.get("/", (req, res) => {
    res.send("Hello user :)")
})

app.listen(8800, () => {
    connect()
    console.log("Server successfully listening!")
})